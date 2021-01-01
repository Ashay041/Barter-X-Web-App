const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet , X509WalletMixin, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
	try {
        var orgName = process.argv[2];// = 
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.'+orgName+'.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath)//await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.exists('ca-'+orgName+'-admin');
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }
        console.log('In HERE');
        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'ca-'+orgName+'-admin', enrollmentSecret: 'ca-'+orgName+'-adminpw' });
        
        // const x509Identity = {
        //     credentials: {
        //         certificate: enrollment.certificate,
        //         privateKey: enrollment.key.toBytes(),
        //     },
        //     mspId: 'Org1MSP',
        //     type: 'X.509',
        // };
        var orgName1 = orgName.charAt(0).toUpperCase() + orgName.substr(1);
        var orgMSP = orgName1 + 'MSP'; 
        const x509Identity = X509WalletMixin.createIdentity( orgMSP, enrollment.certificate, enrollment.key.toBytes());
        await wallet.import('ca-'+orgName+'-admin', x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');	
			
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
	
}

main();
