import { WebKwil } from "kwil";
import { BrowserProvider } from "ethers";
import testDb from "./testDb2.kf.json";

// In this file, I will only show how to deploy a database using the WebKwil client. All other functionality is the same as in the Node.js example.

//Step 1. Configure WebKwil Client
const kwil = new WebKwil({
  kwilProvider: import.meta.env.VITE_KWIL_PROVIDER,
  timeout: 10000
})

// Step 2. Get Ethereum signer
async function getSigner() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner();
  return signer;
}

async function deployDatabase() {
  // Step 3. Create a new database transaction
  const dbTx = await kwil
    .dbBuilder()
    .payload(testDb)
    .signer(await getSigner())
    .buildTx();

  // Step 4. Broadcast the transaction
  const res = await kwil.broadcast(dbTx);

  // console log the result
  console.log(res);
}

// assign the deployDatabase function to a button
window.deployDatabase = deployDatabase;