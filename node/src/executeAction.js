const { kwil, wallet } = require('./nodeKwil');
const { getDBID } = require('./getSchema');

// This file demonstrates how to execute an action on a Kwil database.

// Option 1: Execute a single action instance
async function executeAction() {
    //Step 1. Get the DBID of the database you want to interact with
    const DBID = getDBID(wallet.address, 'testDb1');

    //Step 2. Retrieve the action that you wish to execute
    const action = await kwil.getAction(DBID, 'create_user');

    //Step 3. Create a new action instance
    const actionInstance = action.newInstance();

    //Step 4. Set the parameters of the action instance
    actionInstance.set('$id', 1);
    actionInstance.set('$username', 'kwilluke');
    actionInstance.set('$age', 69);

    //Step 5 (optional) call is complete to check that all action inputs are set
    if (!action.isComplete()) {
        throw new Error('Action is not complete');
    }

    //Step 6. Create a new transaction with .prepareAction() and sign it with your wallet
    const tx = await action.prepareAction(wallet);

    //Step 7. Broadcast the transaction
    const res = await kwil.broadcast(tx);

    // console log the result
    console.log(res);
}

// Option 2: Execute multiple action instances in one transaction with an array of objects.
async function executeBulkAction() {
    //Step 1. Get the DBID of the database you want to interact with
    const DBID = getDBID(wallet.address, 'testDb1');

    //Step 2. Retrieve the action that you wish to execute
    const action = await kwil.getAction(DBID, 'create_user');

    //Step 3. Define array of action instances
    const actionInstances = [
        {
            '$id': 2,
            '$username': 'satoshi',
            '$age': 420,
        },
        {
            '$id': 3,
            '$username': 'vitalik',
            '$age': 1337,
        }
    ]

    //Step 4. Pass the array of instances to .bulk()
    action.bulk(actionInstances);

    //Step 5 (optional) call is complete to check that all action inputs are set
    if (!action.isComplete()) {
        throw new Error('Action is not complete');
    }

    //Step 6. Create a new transaction with .prepareAction() and sign it with your wallet
    const tx = await action.prepareAction(wallet);

    //Step 7. Broadcast the transaction
    const res = await kwil.broadcast(tx);

    // console log the result
    console.log(res);
}

// executeAction();
// executeBulkAction();