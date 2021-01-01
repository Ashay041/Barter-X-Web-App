const express = require('express');
const router = express.Router();
//const Subscriber = require('../models/subscriber');
const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet , X509WalletMixin, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const { start } = require('repl');

router.post('/store', async(req,res) => {
	try {

        // product data from body:
        const productID=req.body.productID;
        const name=req.body.name;
        const category=req.body.category;
        const status=req.body.status;
        const owner=req.body.owner;
        const price=req.body.price;

        //user info from query
        const user_id=req.query.user_id;
        const orgName=req.query.orgName;

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.   
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.exists(user_id);
        if (!identity) {
            console.log('An identity for the user ', user_id , ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('demochannel');

        // Get the contract from the network.
        const contract = network.getContract('resources');

        await contract.submitTransaction('Create', productID, name, category, status, owner, price);
        
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({message: 'PRODUCT ADDED'});

	} catch (err) {
		res.status(500).json({message: err.message});
	} 
});

router.get('/read', async(req,res) => {
	try {
        
        //info from query
        const user_id=req.query.user_id;
        const orgName=req.query.orgName;
        const productID=req.query.productID;

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.   
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.exists(user_id);
        if (!identity) {
            console.log('An identity for the user ', user_id , ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('demochannel');

        // Get the contract from the network.
        const contract = network.getContract('resources');

        const result = await contract.submitTransaction('Read2', productID);
        
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({message: result.toString()});

	} catch (err) {
		res.status(500).json({message: err.message});
	} 
});

router.post('/transfer', async(req,res) => {
	try {

        // token data from body:
        const product1=req.body.product1;
        const product2=req.body.product2;

        //user info from query
        const user_id=req.query.user_id;
        const orgName=req.query.orgName;


        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.   
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.exists(user_id);
        if (!identity) {
            console.log('An identity for the user ', user_id , ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('demochannel');

        // Get the contract from the network.
        const contract = network.getContract('resources');

        await contract.submitTransaction('Final', product1, product2);

        console.log('Transaction performed successfully.');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({message: 'TRANSFER SUCCESSFULL!'});

	} catch (err) {
		res.status(500).json({message: 'Transaction failed!'});
	} 
});

router.post('/update',async(req,res)=>{

    try{
    const productID=req.body.productID;
    const index=req.body.index;
    const value=req.body.value;

    //query param
    const orgName=req.query.orgName
    const user_id=req.query.user_id
    
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.   
    const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.exists(user_id);
    if (!identity) {
        console.log('An identity for the user ', user_id , ' does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('demochannel');

    // Get the contract from the network.
    const contract = network.getContract('resources');

    await contract.submitTransaction('Update2', productID, index, value);
    
    console.log('Transaction has been submitted');

    // Disconnect from the gateway.
    await gateway.disconnect();

    res.status(200).json({message: 'PRODUCT UPDATED'});

} catch (err) {
    res.status(500).json({message: err.message});
} 

});

router.get('/index', async(req,res) => {
	try {
        
        //info from body
        const start_index=req.body.start_index;
        const last_index=req.body.last_index;

        //info from query
        const user_id=req.query.user_id;
        const orgName=req.query.orgName;

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.   
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.exists(user_id);
        if (!identity) {
            console.log('An identity for the user ', user_id , ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('demochannel');

        // Get the contract from the network.
        const contract = network.getContract('resources');

        const result = await contract.submitTransaction('Index', start_index, last_index);
        
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({message: result.toString()});

	} catch (err) {
		res.status(500).json({message: err.message});
	} 
});

router.get('/getProductHistory', async(req, res)=> {
    try{
        const productID=req.body.productID;
        const orgName = req.query.orgName
        const user_id= req.query.user_id

        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.   
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.exists(user_id);
        if (!identity) {
            console.log('An identity for the user ', user_id , ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('demochannel');

        // Get the contract from the network.
        const contract = network.getContract('resources');
        //putData = String(data)
        
        const data = await contract.submitTransaction('GetProductHistory', productID);//, query);
        
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json(JSON.parse(data));

    } catch (err) {
        res.status(500).json({message: err.message});
    }  
});


//Rich query starts here

router.get('/userProducts', async(req,res) => {
	try {
       
        //info from query
        const user_id=req.query.user_id;
        const orgName=req.query.orgName;
        
        var query = req.query.user
     
        console.log('query submitted is',query)

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..',  'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.   
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.exists(user_id);
        if (!identity) {
            console.log('An identity for the user ', user_id , ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('demochannel');

        // Get the contract from the network.
        const contract = network.getContract('resources');

        const result = await contract.submitTransaction('Rich', query);
        
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({message: result.toString()});

	} catch (err) {
		res.status(500).json({message: err.message});
	} 
});


router.get('/category', async(req,res) => {
	try {
        
        
       
        //info from query
        const user_id=req.query.user_id;
        const orgName=req.query.orgName;
        
      
        var query = req.query.category
     
        console.log('query submitted is',query)

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..',  'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.   
        const walletPath = path.join(process.cwd(), '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.exists(user_id);
        if (!identity) {
            console.log('An identity for the user ', user_id , ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_id, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('demochannel');

        // Get the contract from the network.
        const contract = network.getContract('resources');

        const result = await contract.submitTransaction('Category', query);
        
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({message: result.toString()});

	} catch (err) {
		res.status(500).json({message: err.message});
	} 
});



module.exports = router