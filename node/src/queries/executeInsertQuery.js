const { kwil, wallet } = require("../nodeKwil");

//Retrieve Database to see what queries are available

async function ExecuteInsert(ownerAddress, dbName) {
    const dbi = await kwil.selectDatabase(ownerAddress, dbName);
    const executable = dbi.getExecutable("insert_user");

    executable.setInput('id', 1);
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
