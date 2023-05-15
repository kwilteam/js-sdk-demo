const { NodeKwil } = require('kwil');
const { Wallet } = require('ethers')
require('dotenv').config();

// Configure NodeKwil Client
const kwil = new NodeKwil({
    kwilProvider: process.env.KWIL_PROVIDER,
    timeout: 10000,
    logging: false
})

// Create Wallet to sign transactions
const wallet = new Wallet(process.env.PRIVATE_KEY)

// Export NodeKwil Client
module.exports = { 
    kwil,
    wallet
}
