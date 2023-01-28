const kwilNodeFile = require('../../node/src/nodeKwil.js');

const kwil = kwilNodeFile.kwil;
const wallet = kwilNodeFile.wallet;

// Get DB ID
async function getDbID(address, database) {
    let dbi = await kwil.selectDatabase(address, database);
    return dbi.DBID
}

async function readTableData(address, datababase, tableName) {
    // Retrieve DB ID
    let dbId = await getDbID(address, datababase);

    // Create graphql query
    const res = await kwil.graphql(`query getAllData {
        ${dbId}_${tableName} {
            id
            name
            wallet
        }
    }`)

    console.log(res)
}

readTableData(wallet.address, "demo_db", 'users');