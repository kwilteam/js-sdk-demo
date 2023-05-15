const { kwil, wallet } = require('./nodeKwil');
const { getDBID } = require('./getSchema');
const { Utils } = require('kwil');

// This file demonstrates how to execute an action on a Kwil database.

// Option 1: Execute a single action instance
async function executeAction() {
    //Step 1. Get the DBID of the database you want to interact with
    const dbid = getDBID(wallet.address, 'testDb1');

    //Step 2. Construct the action input and add values
    const input = new Utils.ActionInput()
        .put('$id', 1)
        .put('$username', 'kwilluke')
        .put('$age', 69);
    
    //Step 3. Build action transaction, with the dbid, action name, inputs, and signature
    const tx = await kwil
        .actionBuilder()
        .dbid(dbid)
        .name('create_user')
        .concat(input)
        .signer(wallet)
        .buildTx();

    //Step 4. Broadcast the transaction 
    const res = await kwil.broadcast(tx);

    // console log the result
    console.log(res);
}

// Option 2: Execute multiple action instances in one transaction with an array of objects.
async function executeBulkAction() {
    //Step 1. Get the DBID of the database you want to interact with
    const DBID = getDBID(wallet.address, 'testDb1');

    //Step 2. Construct the action input with an array of object.
    const inputs = new Utils.ActionInput()
        .putFromObjects([
            { '$id': 2, '$username': 'kwilluke', '$age': 69 },
            { '$id': 3, '$username': 'kwilluke', '$age': 69 },
            { '$id': 4, '$username': 'kwilluke', '$age': 69 },
        ])
    
    //Step 3. Build action transaction, with the dbid, action name, inputs, and signature
    const tx = await kwil
        .actionBuilder()
        .dbid(DBID)
        .name('create_user')
        .concat(inputs)
        .signer(wallet)
        .buildTx();

    //Step 4. Broadcast the transaction
    const res = await kwil.broadcast(tx);

    // console log the result
    console.log(res);
}

// executeAction();
// executeBulkAction();