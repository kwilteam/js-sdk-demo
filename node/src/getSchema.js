const { kwil, wallet } = require('./nodeKwil')

// This file contains functions to help you view Kwil database metadata

// Retrieve the database ID (DBID)
function getDBID(ownerAddress, dbName) {
    return kwil.getDBID(ownerAddress, dbName); 
}

// List all databases belonging to a particular owner
async function listDatabases(ownerAddress) {
    return await kwil.listDatabases(ownerAddress);
}

// Retrieve the schema of a database
async function getSchema(DBID) {
    return await kwil.getSchema(DBID);
}

// Retrieve the details of a particular account
async function getAccount(address) {
    return await kwil.getAccount(address);
}

module.exports = {
    getDBID
}