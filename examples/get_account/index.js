const { TvmClient } = require("@tvmsdk/core");
const { libNode } = require("@tvmsdk/lib-node");
const assert = require('assert');
TvmClient.useBinaryLibrary(libNode);

// Accounts are addressed by account_id together with the dapp_id they live in.
const ACCOUNT_ID = "7777777777777777777777777777777777777777777777777777777777777777";
const DAPP_ID = "0000000000000000000000000000000000000000000000000000000000000000";


; (async () => {
    const endpoint = process.argv[2];
    if (!endpoint) {
        console.error("Usage: node index.js <scheme://host>");
        process.exit(1);
    }


    const client = new TvmClient({
        network: { endpoints: [endpoint] }
    });

    try {

        console.log("Executing `account.get_account`.");

        let params = {
            account_id: ACCOUNT_ID,
            dapp_id: DAPP_ID
        };
        let response = await client.account.get_account(params);
        console.log(`Response:`, response);
        assert(response.boc.length > 0)

        console.log("Executing `net.query`.");
        params = {
            query: `{
                        blockchain {
                            account(
                                account_id: "${ACCOUNT_ID}"
                                dapp_id: "${DAPP_ID}"
                            ) {
                                info {
                                    balance
                                    address
                                    dapp_id
                                }
                            }
                        }
                    }`,
        };
        response = await client.net.query(params);
        console.log(`Response:`, response.result.data.blockchain.account);
        let { address } = response.result.data.blockchain.account.info;
        assert.strictEqual(address, ACCOUNT_ID)

    } catch (error) {
        console.error('Error:', error);
        process.exitCode = 1;
    } finally {
        // The open client keeps the process alive.
        client.close()
    }
})()
