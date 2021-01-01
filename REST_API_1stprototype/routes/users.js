const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const userTx = require('../models/usertx');
//const Subscriber = require('../models/subscriber');
const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet , X509WalletMixin, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

router.post('/createWallet', async(req,res) => {
	try {

		const usr_id = req.body.usr_id;
		const orgName = req.body.orgName;
		const org_aff = req.body.org_aff;

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.'+orgName+'.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath)//await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.exists(usr_id);
        if (userIdentity) {
            console.log('An identity for the user '+usr_id+' already exists in the wallet');
            return;
        }
        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.exists('ca-'+orgName+'-admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user '+ orgName +'-admin does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'ca-'+orgName+'-admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        // const ca = gateway.getClient().getCertificateAuthority();
        const adminUser = gateway.getCurrentIdentity();

        const secret = await ca.register({ affiliation: orgName+'.'+org_aff, enrollmentID: usr_id, role: 'client' }, adminUser);
		var orgName1 = orgName.charAt(0).toUpperCase() + orgName.substr(1);
        var orgMSP = orgName1 + 'MSP'; 

		const enrollment = await ca.enroll({ enrollmentID: usr_id, enrollmentSecret: secret });
        const x509Identity = X509WalletMixin.createIdentity(orgMSP, enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(usr_id, x509Identity);
        console.log('Successfully registered and enrolled admin user '+usr_id+' and imported it into the wallet');		
        // const subscribers = await Subscriber.find();
        
        
        await gateway.connect(ccp, { wallet, identity: usr_id, discovery: { enabled: true, asLocalhost: true } });
    
        const network = await gateway.getNetwork('demochannel');
        
        // Get the contract from the network.
        const contract = network.getContract('resources');
        user_string = usr_id.toString()
        
        await contract.submitTransaction("Create_wall","W"+user_string,user_string,"100");
        
        console.log('BarterX account created');
        
		res.status(200).json({message: 'WALLET CREATED SUCCESSFULLY AT ' + walletPath});
	} catch (err) {
		res.status(500).json({message: err.message});
	} 
});

router.get('/getTxs', async(req,res) => {
    mongoose.connect('mongodb://localhost/users1', { useNewUrlParser: true, useFindAndModify: false })
    const db = mongoose.connection
    db.once('open', () => console.log('DB STARTED'));
    const orgName = req.query.orgName;
    const user_id = req.query.user_id;
    
    try{
        var username = user_id + "-" + orgName;

        // Get the network (channel) our contract is deployed to.
        //const network = await gateway.getNetwork('demochannel');
        await userTx.findOne({"username": username}, 
            function (err, data) {
                if (err) throw err;
                 //res.status(500).json({message: err.message});
                res.data = data
                console.log(data);
            
        });
        res.status(201).json(res.data);
     } catch (err) {
         res.status(500).json({message: err.message});
     }
    // res.status(200).json(res.data);
});


module.exports = router