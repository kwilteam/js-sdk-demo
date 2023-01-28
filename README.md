# Kwil Javascript SDK Demo

This repository demonstrates the how to use the Kwil Javascript SDK in node and browser. The Kwil JS SDK allows developers to easily deploy, write to, and read from databases on the Kwil network.

To begin using the Kwil JS SDK, run:
```
npm i kwil
```

## Node.js
Sample node.js files can be found under the "./node" folder. The node folder contains examples for how to deploy a database, execute queries against the database, and read from the database using GraphQL.

To initiate using the SDK in Node.js, being by using the "NodeKwil" class.

## Browser
Sample browser files can be found under the "./browser" folder. The "./browser/main.js" contains an example for how to deploy a Kwil database in the browser.

The only difference between using the Kwil JS SDK in browser from node is that in the browser, using the SDK is initiated by the "WebKwil" class. Executing queries and reading data work the same as in Node.

You can test the browser by running the following commands:
```
cd browser
npm run dev
```

### If you have any questions, please email info@kwil.com or pop into our [Discord](https://discord.com/invite/HzRPZ59Kay).