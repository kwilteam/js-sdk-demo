const { kwil } = require('./nodeKwil');
const { ethers, JsonRpcProvider } = require('ethers');

class Payment {
    constructor(signer) {
        this.signer = signer;
    }

    //Step 1. Retrieve the Funder Object
    async getFunder() {
        return await kwil.getFunder(this.signer);
    }

    //Step 2. Get the balance of a wallet address
    async getBalance(address) {
        const funder = await this.getFunder();
        return await funder.getBalance(address)
    }

    //Step 3. Approve funds to be deposited to funding pool
    async approve(amount) {
        const funder = await this.getFunder();
        return await funder.approve(BigInt(amount) * BigInt(10 ** 18));
    }

    //Step 4. Get the allowance of a wallet address
    async getAllowance(address) {
        const funder = await this.getFunder();
        return await funder.getAllowance(address);
    }

    //Step 5. Deposit funds to the funding pool
    async deposit(amount) {
        const funder = await this.getFunder();
        return await funder.deposit(BigInt(amount) * BigInt(10 ** 18));
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
    const provider = new JsonRpcProvider(process.env.ETH_PROVIDER);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const funding = new Payment(wallet);

    const res = await funding.getTokenAddress();

    console.log(res);
}

// testFunding();