const { NodeKwil, DBBuilder, Types } = require('kwil');
const ethers = require('ethers');
require('dotenv').config();

// Get Wallet Address
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

// Create Kwil Node Client
const kwil = new NodeKwil({
    kwilProvider: process.env.KWIL_PROVIDER,
    timeout: 10000,
    logging: false
})




// Initialize DB Builder

let db = new DBBuilder("demo_db", wallet.address);

// Create New Table
let usersTable = db.newTable("users")

    // Create columns
    let idColumn = usersTable.newColumn("id", Types.DataType.INT64);
    let userNameColumn = usersTable.newColumn("user_name", Types.DataType.STRING);
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

    // Add parameters to insert query
    let idParameter = insertQuery.newParameter("id", idColumn.name);
    let nameParameter = insertQuery.newParameter("name", userNameColumn.name);
    let walletParameter = insertQuery.newParameter("wallet", walletColumn.name);

    // Add Caller Modifier to wallet parameter
    walletParameter.setStatic("")
    walletParameter.setModifier(Types.ModifierType.CALLER);

    // Add parameters to Insert Query
    insertQuery.addParameter(idParameter);
    insertQuery.addParameter(nameParameter);
    insertQuery.addParameter(walletParameter);


    // Add Insert Query to database
    db.addQuery(insertQuery);

// Create Update Query
let updateQuery = db.newQuery("update_user", usersTable.name, Types.QueryType.UPDATE);

    // Add parameters to update query
    let updateIdParameter = updateQuery.newParameter("id", idColumn.name);
    let updateNameParameter = updateQuery.newParameter("user_name", userNameColumn.name);

    // Add Where Clause to update query
    let walletWhereClause = updateQuery.newWhere("wallet_where_clause", walletColumn.name, Types.OperatorType.EQUAL);

    // Add Caller Modifier to wallet where clause
    walletWhereClause.setStatic("");
    walletWhereClause.setModifier(Types.ModifierType.CALLER);

    // Add Parameters and Where Clause to Update Query
    updateQuery.addParameter(updateIdParameter);
    updateQuery.addParameter(updateNameParameter);
    updateQuery.addWhere(walletWhereClause);

    // Add Update Query to database
    db.addQuery(updateQuery);

// Create Delete Query
let deleteQuery = db.newQuery("delete_user", usersTable.name, Types.QueryType.DELETE);

    // Add Where Clause to delete query
    let deleteWhereWallet = deleteQuery.newWhere("delete_wallet_where", walletColumn.name, Types.OperatorType.EQUAL);

    // Add Caller Modifier to delete Where Clause
    deleteWhereWallet.setStatic("");
    deleteWhereWallet.setModifier(Types.ModifierType.CALLER);

    // Add Where Clause to Delete Query
    deleteQuery.addWhere(deleteWhereWallet);

    // Add Delete Query to database
    db.addQuery(deleteQuery);

// Create New Roles
let adminRole = db.newRole("admin_role");
let userRole = db.newRole("user_role");

    // Make userRole default
    userRole.setDefault(true);

    // Add Permissions to roles
    adminRole.addPermission(insertQuery.name);
    adminRole.addPermission(updateQuery.name);
    adminRole.addPermission(deleteQuery.name);

    userRole.addPermission(insertQuery.name);
    userRole.addPermission(updateQuery.name);

    // Add roles to database
    db.addRole(adminRole);
    db.addRole(userRole);

// Create New Index
let idIndex = db.newIndex("id_index", usersTable.name, Types.IndexType.BTREE);

    // Add columns for index to apply to
    idIndex.addColumn(idColumn.name);

    // Add index to database
    db.addIndex(idIndex);

// Validate Database
async function validateDB(database) {
    const validate = await kwil.validateSchema(database.export());
    return validate.data.valid;
}

// Deploy Database
async function deployDB(database) {
    let tx = database.newTx();
    tx = await kwil.prepareTx(tx, wallet);

    const res = await kwil.broadcast(tx);
    console.log(res)
}

// if(validateDB(db)) {
//     deployDB(db);
// };

module.exports = {
    kwil,
    wallet
}