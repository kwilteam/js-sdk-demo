const { kwil } = require('../nodeKwil');
const { ethers } = require('ethers');

class Payment {
    constructor(pool, ethProvider) {
        this.pool = pool;
        this.ethProvider = ethProvider;
    }

    async getFunder() {
        return await kwil.getFunder(this.pool, this.ethProvider);
    }

    async getBalance(address) {
        const funder = await this.getFunder();
        return (await funder.getBalance(address)).toString();
    }

    async approve(amount) {
        const funder = await this.getFunder();
        return await funder.approve(ethers.BigNumber.from(`${amount}`));
    }

    async getAllowance(address) {
        const funder = await this.getFunder();
        return (await funder.getAllowance(address)).toString();
    }

    async deposit(amount) {
        const funder = await this.getFunder();
        return await funder.deposit(ethers.BigNumber.from(`${amount}`));
    }

    async getDepositedBalance(address) {
        const funder = await this.getFunder();
        return (await funder.getDepositedBalance(address)).toString();
    }

    async getTokenAddress() {
        const funder = await this.getFunder();
        return await funder.getTokenAddress();
    }
}

async function testFunding() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_PROVIDER);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const kwilFundingPool = "0xb0a194286A901FeAEA39D2b765247BEd64aD4F41";

    const funding = new Payment(kwilFundingPool, wallet);

    const res = await funding.approve(100);

    console.log(res);
}

testFunding();



