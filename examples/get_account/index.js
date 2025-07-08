const { TvmClient } = require("@tvmsdk/core");
const { libNode } = require("@tvmsdk/lib-node");
const assert = require('assert');
TvmClient.useBinaryLibrary(libNode);


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
            address: "0:1111111111111111111111111111111111111111111111111111111111111111"
        };
        let response = await client.account.get_account(params);
        console.log(`Response:`, response);
        assert(response.boc.length > 0)

        console.log("Executing `net.query`.");
        params = {
            query: `{
                        blockchain {
                            account(
                                address: "0:1111111111111111111111111111111111111111111111111111111111111111"
                            ) {
                                info {
                                    balance
                                    address
                                }
                            }
                        }
                    }`,
        };
        response = await client.net.query(params);
        console.log(`Response:`, response.result.data.blockchain.account);
        let { address } = response.result.data.blockchain.account.info;
        assert(address, "0:1111111111111111111111111111111111111111111111111111111111111111")

        client.close()

    } catch (error) {
        console.error('Error:', error);
    }
})()
