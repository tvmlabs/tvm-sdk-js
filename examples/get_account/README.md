# TVM SDK JS Example

This is a simple example demonstrating how to execute `account.get_account` and `net.query` requests using the TVM SDK for JavaScript.

## Usage

Build `tvmsdk.node` binary

```
cd ../../packages/lib-node/build
cargo run
```

Install dependencies:

```bash
npm install
```

Run the example with the address of the BlockManager as an argument:

```bash
node index.js <scheme://host>
```
For example, on the main network, this address will be forwarded to the BlockManager instance:

```
  node index.js https://mainnet.ackinacki.org
```
**Note:** The `<scheme://host>` argument must point to a running BlockManager instance.

### Example (using local network)

Start your local network:

```bash
make local_gossip_silent
```

Then run:

```bash
node index.js http://127.0.0.1
```

### Sample Output

```bash
Executing `account.get_account`.
Response: {
  boc: 'te6ccgICAukAAQAAnLEAAAO1GADu7u7u7u7u7u7u7u7u7u7u7u7.....skipped....',
  dapp_id: '0000000000000000000000000000000000000000000000000000000000000000',
  state_timestamp: 1791493236558,
  account_id: '7777777777777777777777777777777777777777777777777777777777777777'
}
Executing `net.query`.
Response: {
  info: {
    balance: '0x39640533b844f',
    address: '7777777777777777777777777777777777777777777777777777777777777777',
    dapp_id: '0000000000000000000000000000000000000000000000000000000000000000'
  }
}
```
