const { kwil, wallet } = require('./nodeKwil')
const { getDBID } = require('./getSchema')

// An option for reading data from your database is to execute ad-hoc SELECT queries.

async function select(ownerAddress, dbName, query) {
    // Step 1. Get the DBID of the database you want to interact with
    const DBID = getDBID(ownerAddress, dbName);

    // Step 2. Execute the query
    const res = await kwil.selectQuery(DBID, query);

    // Step 3. Return the result
    return res;
}


async function query() {
    console.log(await select(wallet.address, 'testDb1', 'SELECT * FROM users WHERE age > 30'))
}

query()

