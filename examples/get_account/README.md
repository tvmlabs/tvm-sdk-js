# TVM SDK JS Example

This is a simple example demonstrating how to execute `account.get_account` and `net.query` requests using the TVM SDK for JavaScript.

## Usage

Install dependencies:

```bash
npm install
```

Run the example with the address of the BlockManager as an argument:

```bash
node index.js <scheme://host>
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
  boc: 'te6ccgECIAEABVcAA7cYACIiIiIiIiIiIiIiIiI.....skipped....+czYocUIAAEAAE1Q+czYocUIAAEA='
}
Executing `net.query`.
Response: {
  info: {
    balance: '0x8ac7230489e80000',
    address: '0:1111111111111111111111111111111111111111111111111111111111111111'
  }
}
```
