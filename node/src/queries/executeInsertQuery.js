const { Utils } = require("kwil");
const { kwil, wallet } = require("../nodeKwil");

//Retrieve Database to see what queries are available

async function ExecuteInsert(ownerAddress, dbName) {
    const dbi = await kwil.selectDatabase(ownerAddress, dbName);
    const executable = dbi.getQuery("insert_user");

    //Generate a new RFC-4122 Compliant UUID
    const newUUID = Utils.UUID.v4();
    const isValid = Utils.UUID.isRFC4122Compliant(newUUID);

    //Ensure UUID is valid
    if(!isValid) {
        throw new Error("UUID is not valid");
    }

    executable.setInput('id', newUUID);
    executable.setInput('name', "kwilLuke");

    //Check if Executable is complete
    if(!executable.isComplete()) {
        throw new Error("Executable is not complete");
    }

    //Generate a new transaction from the filled executable
    let tx = executable.newTx();
    
    //Prepare the transaction
    tx = await kwil.prepareTx(tx, wallet);

    //Broadcast the transaction
    const res = await kwil.broadcast(tx);

    console.log(res)

}

ExecuteInsert(wallet.address, "demo_db");
