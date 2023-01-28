import { WebKwil, Types, DBBuilder } from "kwil";
import { ethers } from "ethers";

// Get eth provider
async function getSigner() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider._ready();
  await ethereum.request({ method: "eth_requestAccounts" });
  const signer = provider.getSigner();
  return signer;
}

async function getAddress() {
  const signer = await getSigner();
  const address = await signer.getAddress();
  return address;
}

//Create WebKwil Client
const kwil = new WebKwil({
    kwilProvider: import.meta.env.VITE_KWIL_PROVIDER,
    graphqlProvider: import.meta.env.VITE_GRAPHQL_PROVIDER,
    timeout: 10000,
    apiKey: import.meta.env.VITE_API_KEY,
    logging: false
})

async function deployDatabase() {
  // Get Signer 
  const signer = await getSigner();

  // Get Wallet Address
  const walletAddress = await getAddress();

  // Initialize DB Builder
  let db = new DBBuilder("browser_demo_db", walletAddress);

  // Create New Table
  let usersTable = db.newTable("users", walletAddress)

      // Create columns
      let idColumn = usersTable.newColumn("id", Types.DataType.INT64);
      let userNameColumn = usersTable.newColumn("name", Types.DataType.STRING);
      let walletColumn = usersTable.newColumn("wallet", Types.DataType.STRING);

      // Add attributes to columns
      idColumn.addAttribute(Types.AttributeType.PRIMARY_KEY);
      userNameColumn.addAttribute(Types.AttributeType.NOT_NULL);
      userNameColumn.addAttribute(Types.AttributeType.MIN_LENGTH, 7);
      walletColumn.addAttribute(Types.AttributeType.NOT_NULL);

      // Add columns to table
      usersTable.addColumn(idColumn);
      usersTable.addColumn(userNameColumn);
      usersTable.addColumn(walletColumn);

      // Add table to database
      db.addTable(usersTable);

    // Create Insert Query
    let insertQuery = db.newQuery("insert_user", usersTable.name, Types.QueryType.INSERT);

      // Add parameters to query
      let idParameter = insertQuery.newParameter("id", idColumn.name);
      let nameParameter = insertQuery.newParameter("name", userNameColumn.name);
      let walletParameter = insertQuery.newParameter("wallet", walletColumn.name);

      // Add Caller Modifier to wallet parameter
      walletParameter.setStatic("");
      walletParameter.setModifier(Types.ModifierType.CALLER);

      // Add parameters to insert query
      insertQuery.addParameter(idParameter);
      insertQuery.addParameter(nameParameter);
      insertQuery.addParameter(walletParameter);

      // Add insert query to database
      db.addQuery(insertQuery);

    // Create Update Query
    let updateQuery = db.newQuery("update_user", usersTable.name, Types.QueryType.UPDATE);

      // Add parameters to update query
      let updateIdParameter = updateQuery.newParameter("id", idColumn.name);
      let updateNameParameter = updateQuery.newParameter("name", userNameColumn.name);

      // Add Where Clause to update query
      let walletWhereClause = updateQuery.newWhere("wallet", walletColumn.name, Types.OperatorType.EQUAL);

      // Add Caller Modifier to wallet where clause
      walletWhereClause.setStatic("");
      walletWhereClause.setModifier(Types.ModifierType.CALLER);

      // Add parameters and where clause to update query
      updateQuery.addParameter(updateIdParameter);
      updateQuery.addParameter(updateNameParameter);
      updateQuery.addWhere(walletWhereClause);

      // Add update query to database
      db.addQuery(updateQuery);

    // Create Delete Query
    let deleteQuery = db.newQuery("delete_user", usersTable.name, Types.QueryType.DELETE);

      // Add Where clause to delete query
      let deleteWhereWallet = deleteQuery.newWhere("delete_wallet_where", walletColumn.name, Types.OperatorType.EQUAL);

      // Add Caller Modifier to delete where clause
      deleteWhereWallet.setStatic("");
      deleteWhereWallet.setModifier(Types.ModifierType.CALLER);

      // Add where clause to delete query
      deleteQuery.addWhere(deleteWhereWallet);

      // Add delete query to database
      db.addQuery(deleteQuery);

    // Create New Roles
    let adminRole = db.newRole("admin");
    let userRole = db.newRole("user");

      // Make userRole default
      userRole.setDefault(true);

      //Add permissions to roles
      adminRole.addPermission(insertQuery.name);
      adminRole.addPermission(updateQuery.name);
      adminRole.addPermission(deleteQuery.name);

      userRole.addPermission(insertQuery.name);
      userRole.addPermission(updateQuery.name);

      // Add roles to database
      db.addRole(adminRole);
      db.addRole(userRole);

    // Create new index
    let idIndex = db.newIndex("id_index", usersTable.name, Types.IndexType.BTREE);

      // Add columns for index to apply to
      idIndex.addColumn(idColumn.name);

      // Add index to database
      db.addIndex(idIndex);
    
  // Validate Database
  async function validateDB() {
    const validate = await kwil.validateSchema(db.export());
    return validate.data.valid;
}

  // Deploy Database
  async function deployDb(database) {
    let tx = database.newTx();
    tx = await kwil.prepareTx(tx, signer);

    const res = await kwil.broadcast(tx);
    console.log(res);
  }

  
  if (await validateDB(db)) {
    await deployDb(db);
  }

}

window.deployDatabase = deployDatabase;