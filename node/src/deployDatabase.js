const { kwil, wallet } = require('./nodeKwil')

// Step 1. Import JSON Schema. You can create yours with the Kuneiform language at: https://ide.kwil.com
const testDb = require('./testDb.kf.json')

async function deployDatabase(json) {
    // Step 2. Create a new database object
    const db = kwil.newDatabase(json)

    // Step 3. Create a new transaction with .prepareJson() and sign it with your wallet
    const tx = await db.prepareJson(wallet);

    // Step 4. Broadcast the transaction
    const res = await kwil.broadcast(tx);

    // console log the result
    console.log(res)
}

// deployDatabase(testDb)