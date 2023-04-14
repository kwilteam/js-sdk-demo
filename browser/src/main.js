import { WebKwil } from "luke-dev";
import { BrowserProvider } from "ethers";
import testDb from "./testDb2.kf.json";

// In this file, I will only show how to deploy a database using the WebKwil client. All other functionality is the same as in the Node.js example.

//Step 1. Configure WebKwil Client
const kwil = new WebKwil({
  kwilProvider: import.meta.env.VITE_KWIL_PROVIDER,
  timeout: 10000,
  logging: false
})

// Step 2. Get Ethereum signer
async function getSigner() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner();
  console.log(signer)
  return signer;
}

async function deployDatabase() {
  // Step 4. Declare new database from the testDb.kf.json file. You can create yours with the Kuneiform language at: https://ide.kwil.com.
  const db = kwil.newDatabase(testDb);

  //Step 5. Create and sign tx with ethereum signer
  const signer = await getSigner();
  const tx = await db.prepareJson(signer);

  //Step 6. Broadcast tx to Kwil network
  const res = await kwil.broadcast(tx);

  //console log the result
  console.log(res);
}

window.deployDatabase = deployDatabase;