

'use strict';
const express = require('express');
const router = express.Router();
//const Subscriber = require('../models/subscriber');
const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet , X509WalletMixin, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');



const orgName="org1"
const usr_id= "barter"
console.log(orgName)

console.log("started");

async function main(){
     try{


        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'connection-'+orgName+'.json');

       

        console.log('before performing the read'+ccpPath);
       const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        console.log('got ccp path '+ccpPath);

        const walletPath = path.join(process.cwd(), '..','..', 'organizations', 'peerOrganizations', orgName + '.example.com', 'wallet');
        const wallet = new FileSystemWallet(walletPath)//await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);


        const identity = await wallet.exists(usr_id);
        if (!identity) {
            console.log('An identity for the user ', usr_id , ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
           // return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: usr_id,discovery: { enabled:true,asLocalhost:true } });
      

        const network = await gateway.getNetwork('mychannel');
       // console.log(network)
        const contract = network.getContract('resources');

        const listener =  contract.addContractListener('fabcar-listener', 'Transfer', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
              //  return;
            }
            console.log("!!!!Listener is ready !!!!!!!!!!!!!!!!!!!!!!!")
            console.log(`Event:"Transfer of Tokens" Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
        })

        const listener2 =  contract.addContractListener('fabcar-listener2', 'Allow', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
              //  return;
            }
            console.log("!!!!Listener is ready !!!!!!!!!!!!!!!!!!!!!!!")
            console.log(`Event:"Purchase of Tokens" Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
        })
         

        console.log('After the listener (this ia a debug message)');

     }
     catch (err) {
         console.log(err.message)
		return
	} 

}
    

        main()



        

        // Disconnect from the gateway.
       // await gateway.disconnect(); 
