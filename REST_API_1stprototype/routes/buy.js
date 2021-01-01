const express = require('express');
const router = express.Router();
const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet , X509WalletMixin, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

router.post('/tokens', async(req,res) => {
	try {

        // purchase data from body:
        const usr_id=req.body.usr_id;
        const amount=req.body.amount;
        const orgName = req.body.orgName
      
      
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
 
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.exists(usr_id);
        if (!identity) {
            console.log('An identity for the user ', usr_id , ' does not exist in the wallet');
            console.log('Purchasing without account is forbidden');
            return;
        }

        const gateway = new Gateway();
       await  gateway.connect(ccp, { wallet, identity: usr_id, discovery: { enabled: true, asLocalhost: true } });
        const network =  await gateway.getNetwork('demochannel');
        const contract = network.getContract('resources');
        
        await contract.submitTransaction('Allow', "W"+usr_id, amount);
        
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({message: 'Purchase of tokens OK'});

	} catch (err) {
		res.status(500).json({message: err.message});
	} 
});


router.post('/init', async(req,res) => {
	try {

        // purchase data from body:
        const usr_id=req.body.usr_id;
        const amount=req.body.amount;
        const orgName = req.body.orgName
      
      
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
 
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.exists(usr_id);
        if (!identity) {
            console.log('An identity for the user ', usr_id , ' does not exist in the wallet');
            console.log('Purchasing without account is forbidden');
            return;
        }

        const gateway = new Gateway();
       await  gateway.connect(ccp, { wallet, identity: usr_id, discovery: { enabled: true, asLocalhost: true } });
        const network =  await gateway.getNetwork('demochannel');
        const contract = network.getContract('resources');

        putAmount = String(amount)
        
        await contract.submitTransaction("Create_tok","Bartoken",putAmount,"One and only token for barter","barterX");
        
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({message: 'Token has been created'});

	} catch (err) {
		res.status(500).json({message: err.message});
	} 
});




module.exports = router