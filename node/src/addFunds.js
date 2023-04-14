const { kwil } = require('./nodeKwil');
const { ethers } = require('ethers');

class Payment {
    constructor(ethProvider) {
        this.ethProvider = ethProvider;
    }

    //Step 1. Retrieve the Funder Object
    async getFunder() {
        return await kwil.getFunder(this.ethProvider);
    }

    //Step 2. Get the balance of a wallet address
    async getBalance(address) {
        const funder = await this.getFunder();
        return await funder.getBalance(address)
    }

    //Step 3. Approve funds to be deposited to funding pool
    async approve(amount) {
        const funder = await this.getFunder();
        return await funder.approve(ethers.BigNumber.from(`${amount}`));
    }

    //Step 4. Get the allowance of a wallet address
    async getAllowance(address) {
        const funder = await this.getFunder();
        return await funder.getAllowance(address);
    }

    //Step 5. Deposit funds to the funding pool
    async deposit(amount) {
        const funder = await this.getFunder();
        return await funder.deposit(ethers.BigNumber.from(`${amount}`));
    }

    //Step 6. Check deposited balance of a wallet address
    async getDepositedBalance(address) {
        const funder = await this.getFunder();
        return await funder.getDepositedBalance(address)
    }

    //Step 7. Check the address of a token used for funding
    async getTokenAddress() {
        const funder = await this.getFunder();
        return await funder.getTokenAddress();
    }
}

async function testFunding() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_PROVIDER);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const funding = new Payment(wallet);

    const res = await funding.getBalance(wallet.address);

    console.log(res);
}

// testFunding();