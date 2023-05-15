const { kwil, wallet } = require('./nodeKwil')

// Step 1. Import JSON Schema. You can create yours with the Kuneiform language at: https://ide.kwil.com
const testDb = require('./testDb.kf.json')

async function deployDatabase(json) {
    // Step 2. Create a new database transaction
    const dbTx = await kwil
        .dbBuilder()
        .payload(testDb)
        .signer(wallet)
        .buildTx();

    // Step 3. Broadcast the transaction
    const res = await kwil.broadcast(dbTx);

    // console log the result
    console.log(res);
}

deployDatabase(testDb)