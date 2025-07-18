All notable changes to this project will be documented in this file.

## [2.1.1] - core (Acki-Nacki)
### New
- Account module with `get_account` function tht returns BOC
  
## [2.0.2] – core (Acki-Nacki)

### Fixed
- `TonClient` renamed to `TvmClient` 

## [2.0.2] – lib-node (Acki-Nacki)

### Fixed
- `tvmsdk` binary is used instead of `eversdk` binary

## [2.0.1] – lib-node (Acki-Nacki)

### Fixed
- installation script removed for security. Now `tvmsdk.node` binary need to be built or copied to lib-node/build folder manually


## [1.45.0] – 2023-11-10

### New

- ABI 2.4 supported.

### Breaking

- For contracts with ABI version => 2.4 initial public key should be explicitly supplied 
inside `initial_data` in `abi` module functions. Signer public key and `initial_pubkey` parameter
are not used in contract initial data encoding since ABI version 2.4.

- `abi.decode_initial_data` and `abi.update_initial_data` functions don't support ABI version => 2.4.
`abi.decode_account_data` and `abi.encode_initial_data` should be used instead

- Only `workchain_id` parameter is allowed if `state_init` parameter of `DeploySet` is provided.
State init should be finalized and ready to be used in message as is.

- `abi.encode_account` parameter `state_init` is BOC or cached BOC reference instead of
`StateInitSource` enum. There is only one way to provide account state init now.

## [1.44.4] – 2023-11-07

### New

- Account BOC for local error resolving is fetched from blockchain API instead of collections API

## [1.44.3] – 2023-09-05

### New

- Error appeared during network paramaters resolving is returned to client instead of using default parameters

## [1.44.2] – 2023-08-22

### New

- Pruned account serialization supported

## [1.44.1] – 2023-07-25

### New

- functions with callbacks (e.g. `processing.process_messages`) can be called as sync.
- `send_event` parameter is now optional with default value `false`.
  
### Deprecated

- Debot module is [DEPRECATED](https://github.com/tonlabs/ever-sdk/blob/master/docs/reference/types-and-methods/DEPRECATED.md)

## [1.44.0] – 2023-07-12

### New

- Ability to call async functions via `tc_request_sync`.
- In rust API, the following functions become sync (slight breaking):
  `abi::encode_internal_message`, `abi::attach_signature_to_message_body`, `abi::attach_signature`,
  `abi::decode_message`, `abi::decode_message_body`, `abi::decode_account_data`, 
  `abi::update_initial_data`, `abi::encode_initial_data`, `abi::decode_initial_data`,
  `abi::decode_boc`, `abi::encode_boc`, `boc::decode_tvc`, `boc::parse_message`, `boc::parse_transaction`,
  `boc::parse_account`, `boc::parse_block`, `boc::parse_shardstate`, `boc::get_blockchain_config`,
  `boc::get_boc_hash`, `boc::get_code_from_tvc`, `boc::cache_get`, `boc::cache_set`, `boc::cache_unpin`,
  `boc::encode_boc`, `boc::get_code_salt`, `boc::set_code_salt`, `boc::decode_state_init`, `boc::encode_state_init`,
  `boc::encode_external_in_message`, `boc::get_compiler_version`, `processing::monitor_messages`,
  `processing::get_monitor_info`, `processing::cancel_monitor`
- Code generator for `modules.ts` produces `_sync` wrapper for all API functions.
- Added `_sync` version for each SDK function.
  So SDK can be used in utility scripts in sync manner.
  Not all bindings are support sync calls.
  The only binding that supports sync calls is the `lib-node`.
  Example:
  ```javascript
  const sdk = new TonClient();
  console.log(sdk.client.version_sync().version);
  console.log(sdk.net.query_sync("query{info{version}}"));
  ```

## [1.43.3] – 2023-06-24

### Fixed

- Memory leak in a spawned loop of the web socket link.

## [1.43.2] – 2023-06-09

### Fixed

- Non existing accounts are treated as missing since q-server return `non existed` if account is missing

## [1.43.1] – 2023-06-01

### Fixed

- `MonitoredMessage` API representation simplified.

## [1.43.0] – 2023-05-23

### New

- `network.network_retries_count` config parameter is finally deprecated and not used in SDK.
  `max_reconnect_timeout` is used instead
- Message monitoring errors received by subscription are returned from
  `processing.fetch_next_monitor_results` function
- Message monitor buffers new messages for delayed start of the subscription. New subscription
  starts when 1 second has passed since the last addition or when 5 seconds has passed since last sending
- Message monitor uses more than one subscription.
- Version of `ton_types` upped to 2.0.0
- Fixed code for changed dependencies api
- Removed logic related to client-server clock sync
- `boc.encode_tvc` and `boc.decode_tvc` are renamed to `boc.encode_state_init` 
  and `boc.decode_state_init`.
- `boc.decode_tvc` decodes TVC BOC according to the TVC spec.
- `DeploySet.tvc` supports new TVC file format (according to new TVC spec).
  Old tvc files (with serialized state init) are also supported.
- `DeploySet.state_init` allows to specify serialized state init.
- `DeploySet.code` allows to construct state init from provided serialized code.
- `DeploySet`'s fields `tvc`, `state_init` and `code` are mutually exclusive (so you should
  provide value for one of these fields).
- `ProcessingEvent::MessageExpired` is sent to callback in case of retry in `processing.process_message`

## [1.42.1] – 2023-03-23

### Fixed

- Client was notified about every REMP status timeout. Now it is notified only once when fallback 
scenario is started

## [1.42.0] – 2023-03-22

### New

- Added message monitoring functions to the `processing` module: `monitor_messages`, 
    `fetch_next_monitor_results`, `get_monitor_info`, `cancel_monitor****`.
- Added `processing.send_messages` function.
- Improved error resolving for deleted accounts
- `net.first_remp_status_timeout` config parameter default value set to 1 ms in order to start 
fallback scenario together with REMP statuses processing while REMP is not properly tuned yet.
- Network errors are returned on subscription creation if occured

### Fixed

- `ParamsOfSubscribe` was not public.
- `subscribe` did not trim subscription query text. It is required for some graphql servers 
  expecting that query text starts from operation text.

## [1.41.1] – 2023-02-14

### Fixed
- update `getLibName` type declaration

## [1.41.0] – 2023-02-13

### New

- `CapSignatureWithId` capability is supported.
  
    Network signature ID is used by VM in signature verifying instructions if capability
    `CapSignatureWithId` is enabled in blockchain configuration parameters.     
    
    This parameter should be set to `global_id` field from any blockchain block if network can 
    not be reached at the moment of message encoding and the message is aimed to be sent into 
    network with `CapSignatureWithId` enabled. Otherwise signature ID is detected automatically 
    inside message encoding functions.   
    ***Overwrite priority: ExecutionOptions.signature_id -> ClientConfig.network.signature_id -> last network block***

    - `ClientConfig.network.signature_id` optional parameter is added. Specify it in case of offline work for all message signing operations to use. 
    - `ExecutionOptions` is extended with `signature_id` optional parameter. Specify locally for a particular `run_tvm` or `run_executor` call. 
   - `net.get_signature_id` function returns `global_id` if `CapSignatureWithId` capability is enabled,

- `message_id` and `message_dst` fields are added to all `ProcessingEvent` variants
- Config parameter `binding: { library: string, version: string }`. Binding authors should define 
   this parameter at context initialization.
- `tonclient-binding-library` and `tonclient-binding-version` GraphQL request headers.
- `Error.data.binding_library` and `Error.data.binding_version` error data fields. 
- specifying binding info in core initialization.
  
### Client breaking changes
- `abi.get_signature_data` function ouput parameter `hash` is renamed to `unsigned` for consistency with other crypto functions parameters
  
### Possible breaking change on binding side
- Changed type of the `dictionary` parameter or mnemonic crypto functions and crypto config.
  Now it uses `MnemonicDictionary` enum type instead of `number`. `MnemonicDictionary` numeric 
  constants are compatible with previous values. 

### Deprecated
- `debot` engine module is deprecated. Debot engine development has migrated to a separate repository (soon will be published). So, in order to reduce sdk binary size, we will remove `debot` engine module from sdk in the next releases. 


## [1.40.0] – 2023-01-11

### New

- `abi.get_signature_data` function that returns signature from message and hash to verify the signature

### Improvement

- local endpoints with port specified are expanded with `http` protocol instead of `https` (e.g.
`localhost:8033` in expanded to `http://localhost:8033/graphql`)

## [1.39.0] – 2022-12-07

### Improvement

- Resolved endpoints are cached for 10 minutes so subsequent messages sent will not require
additional server request

- Queries are retried in case of network errors when websocket connection is used

- `WaitForTimeout` error code (607) is returned in case of `wait_for_transaction` function was 
successfully executed but expected data did not appeared during the specified timeout

- `timeout` parameter in `net.query_transaction_tree` behaviour changed. Now value 0 indicates that
no time limit should be used and function will wait for all transactions execution

### New

- `transaction_max_count` parameter in `net.query_transaction_tree` which controls the count of
transaction to be awaited and returned

- `data_layout` and `function_name` parameters in `abi.decode_message` and `abi.decode_message_body` 
that can be used to decode responsible function output and optimize message decoding by strict layout check

### Fixed

- `abi.encode_initial_data` function properly creates data in case of public key omitted.
  Now `abi.encode_initial_data` call without initial data values and public key creates
  the same data as compiled tvc

- Graphql error messages with HTTP response 400 was skipped (was not propagated to
  the SDK client application).

- Several misspelling.

- Message processing freeze in case of large amount of messages parallel processing using Websocket
connection

- Websocket interaction thread panic

- **Debot module**:
    - fill hash argument in `SDK.signHash` method with leading zeroes up to 32 bytes.

## [1.38.1] – 2022-11-10

### Improvement

- Aditional info query is removed from `send_message` to minimize API usage

### Fixed

- Error code `Unauthorized` is returned from all network functions in case of authentication failure
- Server connection attempt is not retried in case of authentication failure

## [1.38.0] – 2022-10-06

### New

- **Debot module**:  
    - ABI specification v2.3 is supported in DEngine.
    - Supported flags `OVERRIDE_TS`, `OVERRIDE_EXPT`, `ASYNC_CALL` for external messages in DEngine.
    
### Improvement

- Support cookies in net module for std mode (not wasm)
- Remove network aliases (main, dev, main.ton.dev, net.ton.dev)
- No balancing logic in case of 1 endpoint + removed the check of REMP support on backend during client initialization. 
  These changes will make client initialization faster -> CLI tools that use SDK will work faster, web pages will load initial data faster.
- Changed 401 error message to response message from API
- Tests improvements: cryptobox tests made stable

## [1.37.2] – 2022-08-10

### New

- `crypto.encryption_box_get_info` returns nacl box public key in `info.public` field.
- Gosh instruction are supported in local VM and executor:
    - execute_diff
    - execute_diff_patch_not_quiet
    - execute_zip
    - execute_unzip
    - execute_diff_zip
    - execute_diff_patch_zip_not_quiet
    - execute_diff_patch_quiet
    - execute_diff_patch_zip_quiet
    - execute_diff_patch_binary_not_quiet
    - execute_diff_patch_binary_zip_not_quiet
    - execute_diff_patch_binary_quiet
    - execute_diff_patch_binary_zip_quiet

### Improvement

- `create_crypto_box` optimisation.
  When a user creates a crypto box, library encrypts provided secret information using provided 
  password and salt.
  When library encrypts the secret, it calculates encryption key from password and salt 
  using `scrypt` function which takes a lot of CPU time (about 1 second).
  So when a user creates many crypto boxes using the same password and salt, 
  it takes a lot of time (about 12 seconds for 10 crypto boxes).
  With the optimisations introduced in this version the library stores the 
  pair (password+salt => encryption key) in internal cache for approximately 2 seconds.
  So when a user creates many crypto boxes at a time using the same password and salt, 
  library uses cached information to skip heavy calculations. As a result now it takes only 
  a second to create 10 crypto boxes.  

### Fixed

- Some enum types were not properly presented in api.json (some types that use serde(content="value"))

## [1.37.1] – 2022-08-03

### Fixed

- Pinned BOC cache now has reference counter for each pin in BOC. BOC can be pinned several times 
with the same pin. BOC is removed from cache after all references for all pins are unpinned with
`cache_unpin` function calls.
- Fixed error resolving in case when account state was modified after message expiration time. Now 
appropriate error text is added to error message instead of executor internal error

## [1.37.0] – 2022-07-28

### New

- client sends `config.network.access_key` as `Authorization: Basic ...` or `Authorization: Bearer ...` header. 
- client accepts endpoints with `/graphql` suffixes specified in config.
- `lib-web` option `disableSeparateWorker`. By default, lib web starts a separate worker that will utilize core (wasm). 
   So main thread never freezes – it is fine for UI. But in some cases (e.g. when worker already exists in application or extension)
   separate worker is a bad approach. In this case application can suppress this with `libWebSetup({disableSeparateWorker: true})`.

### Fixed

- Updated zstd in order to fix building.
- Fixed webpack configuration in `packages/lib-web/example`.
- Rewrote README.md to clarify the prerequisites for running lib-web/example.

## [1.36.2] – 2022-07-18

### Fixed

- `responseType` has changed from `number` to `ResponseType` so it presents in doc with link to ResponseType description. 

## [1.36.1] – 2022-07-18

### Improvement

- Time synchronization check between device and server improved:  calculation of timediff with server is  moved from batched query to send_message function and therefore now query execution time does not affect this time diff. 


## [1.36.0] – 2022-07-01

### New

- ABI specification v2.3 is supported
- parameter `address` is added to `abi.encode_message_body` function

### Fixed

- memory leak in `utils.compress_zstd` and `utils.decompress_zstd` functions in WASM

## [1.35.1] – 2022-06-28

### Improved

- `abi` module errors have been improved

## [1.35.0] – 2022-06-28

### New

- `chksig_always_succeed` execution option used in params of the `tvm.run_get`, `tvm.run_tvm`
  and `tvm.run_executor`.
- `abi.calc_function_id` function
- `tokio` library is updated to 1.* version

## [1.34.3] – 2022-06-08

### New

- send `accessKey` header in api requests (specified in `config.network.accessKey`)

### Fixed

- send headers in `info` api requests

## [1.34.2] – 2022-05-30

### Fixed
- build process
- compress/decompress zstd for wasm

## [1.34.1] – 2022-05-26

### New
- supported removing Copy interface from UInt256
- supported changed interface of `ton_types::Cell`

## [1.34.0] – 2022-05-18

### New

- `client.config` function that returns the current client config
- `run_executor().fees` is extended with these fields:  
  
  - `ext_in_msg_fee` - fee for processing external inbound message  
  - `total_fwd_fees` - total fees of action phase  
  - `account_fees`  - total fees the account pays for the transaction  

- `main` and `dev` endpoints aliases for Evernode Cloud Mainnet and Devnet endpoints  
- binding-gen: enum of types produces its own type for each enum variant.
- lib-web: large numbers in transaction fees are rounded now (previously they caused errors).
- core: if an application calls first client core functions in parallel 
  then core creates more than one internal context per single TonClient
  instance.  As a side effect of this is that a Nodejs process didn't
  finish even when `client.close` was called.

## [1.33.1] – 2022-05-10

### Fixed

- Websocket errors weren't treated as a network errors.
  This is why all the processing functions that worked via wss protocol failed on these errors without retries. Now retries are performed.
- SDK tried to rebalance even if only a single endpoint was specified. Now in case of a single endpoint, no rebalancing occurs.

## [1.33.0] – 2022-05-02

### New 

- `allow_partial` flag in all `abi.decode_*` functions. This flag controls decoder behaviour whether return error or not in case of incomplete BOC decoding
- `REMP` supported. `ProcessingEvent` enum is extended with `REMP` statuses (enum of events posted into `processing.wait_for_transaction` function callback )
- UNSTABLE. `first_remp_status_timeout` and `next_remp_status_timeout` parameters in network config

## [1.32.0] – 2022-03-22

### New 

- `network.queries_protocol` config parameter allows selecting protocol the SDK uses to communicaite with GraphQL endpoint:
  - `HTTP` – SDK performs single HTTP-request for each request.
  - `WS` – SDK uses single WebSocket connection to send all requests. This protocol is a preferable
    way when the application sends many GraphQL requests in parallel. 

### Fixed
- **Debot module**:
    - If DEngine received a non-zero exit_code while emulating a transaction while sending a message, DEngine will call onErrorId callback of the message.

## [1.31.0] – 2022-03-09

### New 
**crypto module:**
- `Cryptobox` introduced: root crypto object that stores encrypted secret and acts as a factory for all crypto primitives used in SDK. 
  Crypto box provides signing and encryption boxes.

  Functions:  
  [`create_crypto_box`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_crypto.md#create_crypto_box) - initializes cryptobox with secret   
  [`remove_crypto_box`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_crypto.md#remove_crypto_box) - removes cryptobox and overwrites all secrets with zeroes  
  [`get_crypto_box_seed_phrase`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_crypto.md#get_crypto_box_seed_phrase) - returns decrypted seed phrase  
  [`get_crypto_box_info`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_crypto.md#get_crypto_box_info) - returns encrypted cryptobox secret for next cryptobox initializations  
  [`get_signing_box_from_crypto_box`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_crypto.md#get_signing_box_from_crypto_box) - derives signing box from secret  
  [`get_encryption_box_from_crypto_box`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_crypto.md#get_encryption_box_from_crypto_box) - derives encryption box from secret  
  [`clear_crypto_box_secret_cache`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_crypto.md#clear_crypto_box_secret_cache) - forces secret cache (signing and encryption) clean up (overwrites all secrets with zeroes). 


### Fixed
- Documentation generator for app object interface fills documentation from
  `ParamsOfXXXAppObject` enum.
- Documentation generator for function with `obj` parameter add this parameter 
  into parameters section with link to appropriate AppObject interface.  

## [1.30.2] – 2022-03-14

### Fixed
- Update JSI client podspec for react-native greater than 0.66

## [1.30.1] – 2022-02-16

### Changed
- **Rebranding**:
    - rename repository name from 'ton-client-js' to 'ever-sdk-js'
    - rename binary binding filenames from 'tonclient_' to 'eversdk_'
    - rename npm scope name from '@tonclient' to '@eversdk'
        @tonclient/core             -> @eversdk/core
        @tonclient/lib-node         -> @eversdk/lib-node
        @tonclient/lib-web          -> @eversdk/lib-web
        @tonclient/lib-react-native -> @eversdk/lib-react-native

## [1.30.0] – 2022-02-04

### New
- Added `boc.encode_external_in_message` function to encode message BOC based on 
  a low level message parts such as a body, state init etc.
- Added `net.subscribe` function to start a low level GraphQL subscription.
- Added support for new MYCODE TVM command in `tvm.run_tvm` and `tvm.run_get` functions.

## [1.29.0] – 2022-02-03

### New
- Added `abi.encode_boc` function to encode parameters with values to BOC, using ABI types.
- Added support of `address` type in `boc.encode_boc`.
- All fetch requests are now called with timeouts to prevent freezing in case of infinite answer.
- Support of `MYCODE` instruction in TVM

## [1.28.1] – 2022-02-01

### Fixed
- Support breaking changes in `ton-labs-block-json` v0.7.1
- Updated endpoints for `main.ton.dev` alias.
- Migrate from jcenter() to mavenCentral()

## [1.28.0] – 2021-12-24

### New
- DevNet endpoints now changed to Ever OS domain: eri01.net.everos.dev, rbx01.net.everos.dev, gra01.net.everos.dev
- **Debot module**:
    - Аdded float numbers support for Json interface
- Added guide for custom giver usage.

### Fixed
- Debot module: fixed a bug in Query.query function called with an empty `variables` field.

## [1.27.1] – 2021-12-09
### Fixed
- Empty `function_name` field in the "create run message failed" error.

## [1.27.0] – 2021-12-03

### New
- Function [`abi.encode_initial_data`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_abi.md#encode_initial_data) which
  encodes initial account data with initial values for the contract's static variables and owner's public key. 
  This function is analogue of `tvm.buildDataInit` function in Solidity.

### Fixed
- Subscription for Counterparties failed with 'Unknown type "CounterpartieFilter"' error. 

## [1.26.1] – 2021-12-01

### Fixed
- Fixed building and warning.

## [1.26.0] – 2021-11-25

### New
- **Debot module**:
    - Аdded `allow_no_signature` parameter to `decode_and_fix_ext_msg()` and 
      `onerror_id` return value to `prepare_ext_in_message()` inner functions used in TS4.
    - Added support for async external calls.
    - `Query` interface extended with `waitForCollection` and `query` methods. `waitForCollection` allows to wait
     for completion of async external calls.
    - Added support for DeBots with ABI 2.2.
- Function [`proofs.proof_message_data`](https://github.com/tonlabs/TON-SDK/blob/master/docs/reference/types-and-methods/mod_proofs.md#proof_message_data) which proves message data, retrieved 
  from Graphql API.

## [1.25.0] – 2021-11-08

### New
- Added JS Blob support in lib-web
- New module [`proofs`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_proofs.md) is introduced!  
- Functions [`proofs.proof_block_data`](./docs/mod_proofs.md#proof_block_data) and [`proofs.proof_transaction_data`](./docs/mod_proofs.md#proof_transaction_data) 
  which prove block data, retrieved from Graphql API. 
  
  These are the first functions from proofs series :) Wait for others(`proof_account_data`, `proof_message_data`) in the next releases. 

  Read about them more in the [documentation](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_proofs.md#proof_block_data). 

- [`abi.decode_boc`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_abi.md#decode_boc) function to decode custom BOC data into JSON parameters.
- `Ref(<ParamType>)` type was added to ABI.   
  Solidity functions use ABI types for builder encoding. The simplest way to decode such a BOC is to use ABI decoding. ABI has it own rules for fields layout in cells so manually encoded BOC can not be described in terms of ABI rules. To solve this problem we introduce a new ABI type `Ref(<ParamType>)` which allows to store `ParamType` ABI parameter in cell reference and, thus, decode manually encoded BOCs. This type is available only in `decode_boc` function and will not be available in ABI messages encoding until it is included into some ABI revision.

## [1.24.0] – 2021-10-18

### New
- `boc.get_boc_depth` function to get depth of the provided boc.
- `boc.decode_tvc` function returns additional fields `code_hash`, `code_depth`, `data_hash`, `data_depth` and `compiler_version`

- **Debot module**:
    - added `parse` function to Json interface.

## [1.23.0] – 2021-10-05

### New
- `boc.get_code_salt` and `boc.set_code_salt` functions for contract code salt management.
- `boc.encode_tvc` and `boc.decode_tvc` functions for TVC image encoding and decoding
- `boc.get_compiler_version` function extracting compiler version from contract code
- `abi.update_initial_data` and `abi.decode_initial_data` function for pre-deployment contract data management

## [1.22.0] – 2021-09-20

### New
- ABI v2.2 with fixed message body layout supported. [See the specification](https://github.com/tonlabs/ton-labs-abi/blob/master/docs/ABI_2.2_spec.md).

  Now, for contracts with ABI version < 2.2  compact layout will still be used for compatibility, for contracts with ABI version 2.2 and more - fixed layout will be used.  
**Please, make sure that you updated the ABI if you recompiled your contract with 2.2 ABI, or you may get an inconsistent contract behaviour**.
- **Debot module**:
    - added `getEncryptionBoxInfo`, `getSigningBoxInfo` functions to Sdk interface.
    - implemented Query DeBot interface in DEngine.

## [1.21.5] – 2021-09-13

### Fixed
- `abi.encode_message` and `processing.process_message` created invalid deploy message in case of
`Signer::None` was used, and contract could not be deployed.
- lib-node's bridge crashed on `client.close`.

## [1.21.4] – 2021-09-08

### New
- Support MacOS aarch64 target

## [1.21.3] – 2021-09-02

### New
- Information about used endpoint is added to subscription errors.
- Graphql response error codes 500-599 are treated as retriable network errors

## [1.21.2] – 2021-08-25

### Fixed
- Updated crypto libraries in order to fix building.

## [1.21.1] – 2021-08-24

### Fixed
- http errors were not processed as network errors and didn't lead to endpoint reconnect and request retry

## [1.21.0] – 2021-08-18

### New
- `crypto.create_encryption_box` function for creating SDK-defined encryption boxes. First supported 
algorithm - AES with CBC mode.
- **Debot module**:
    - Аdded public `prepare_ext_in_message` function.

### Fixed
- `tvm.run_executor` did not work when SDK is configured to use TONOS SE, because of incomplete default
blockchain configuration. Now mainnet config from key block 10660619 (last key block at the moment of fix)
is used as default.

## [1.20.1] – 2021-07-30
### Fixed
- `RuntimeError: unreachable`  in wasm

## [1.20.0] – 2021-07-16

### New
- ABI version `2.1` supported.
- Now all requests to GraphQL are limited with timeout to react on unexpected server unavailability.
Existing timeouts in waiting functions keep the same behaviour. All other requests timeout now can 
be set with `net.query_timeout` config parameter. Its default value is 60000 ms
- **Debot module**:
    - added `encrypt`, `decrypt` functions to Sdk interface which accept encryption box handles.

### Fixed
- Deployment with empty signer in cases of public key set in TVC or deploy set.

## [1.19.0] – 2021-07-07

### New
- `get_address_type` function in `utils` module, which validates address and returns its type. See the documentation.
- `decode_account_data` function in `abi` module that converts account data BOC into JSON representation according to ABI 2.1. See the documentation.
- Diagnostic fields `filter` and `timestamp` added to `wait_for_collection` error
- `main.ton.dev` and `net.ton.dev` endpoints that will be deprecated on 12.07.21 are now replaced with [proper endpoints list](https://docs.ton.dev/86757ecb2/p/85c869-networks), if they were specified in network `endpoints` config 

### Fixed
- Search of the first master blocks during the network start period was fixed in blocks and transactions iterators

## [1.18.1] – 2021-07-01

### Improved

- Improved error messages regarding Union-typed parameters (e.g. `abi` and `signer` in `encode_message`): helper functions (e.g. `signerNone`, `signerKeys`, etc.) are suggested if applicable.

## [1.18.0] – 2021-06-26

### New
- Iterators in `net` module: robust way to iterate blockchain items (blocks, transactions) 
  in specified range. See documentation for `create_block_iterator` , `create_transaction_iterator`, 
  `resume_block_iterator`, `resume_transaction_iterator`, `iterator_next`, `iterator_remove` 
  functions.
- Library adds `http://` protocol to endpoints `localhost`, `127.0.0.1`, `0.0.0.0` if protocol 
  isn't specified in config.
- **Debot module**:
    - added tests for Json interface.
## [1.17.0] – 2021-06-21

### New
- Added support of external encryption boxes. [See the documentation](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_crypto.md#register_encryption_box)
- **Debot module**:
    - Dengine waits for completion of all transactions in a chain initiated by debot's onchain call.

## [1.16.1] – 2021-06-16

### New
- `timeout` option to `query_transaction_tree` – timeout used to limit waiting time for the next 
  message and transaction in the transaction tree.
  
### Improved

- Improved error messages regarding ABI and JSON interface. SDK now shows additional tips for the user in cases of 
  errors.

### Fixed
- Warnings in Rust 1.52+. Little fixes in the documentation.
- `total_output` field in fees was always 0.
- `query_transaction_tree` didn't wait for messages.

## [1.16.0] – 2021-05-25

### New

- `query_transaction_tree` function that returns messages and transactions tree produced 
  by the specified message was added to `net` module. [See the documentation](https://github.com/tonlabs/TON-SDK/blob/1.16.0/docs/mod_net.md#query_transaction_tree)
- `libOptions.loadModule` – ability to specify alternative WASM module loader. 

### Fixed

- `AbiData.key` type changed to u32.
- attempt to use `orderBy` instead of `order` in `query_collection` will raise error.

## [1.15.0] – 2021-05-18

### New

- Sync latency detection increases connection reliability. Library will change the current endpoint 
  when it detects data sync latency on it.
  
- Configuration parameters: `latency_detection_interval`, 
  `max_latency`. See client documentation for details. 

- **Debot module**:
    - signing messages with signing box handles returned from debots.
    - return any sdk errors to debot in case of external calls.
    - defining signing box handle used to sign message in approve callback.

## [1.14.2] – 2021-04-30

### Fixed

- Typo in lib-react-native install script

## [1.14.1] – 2021-04-28

### Fixed

- **Debot module**:
    - DebotInfo field `key` renamed to `caption`

## [1.14.0] – 2021-04-28

### New

- **Debot module**:
    - implementation of Network DeBot interface in DEngine.
    - implementation of `signHash` function in Sdk interface.

### Fixed

- **Debot module**:
    - fixed bug in Json interface with supporting nested structures and arrays of structures.
    - fixed bug in Json interface with keys containing hyphens.

## [1.13.0] – 2021-04-23

### New
- Refined bridging model in `core` package. Library introduces new interface BinaryBridge. 
  Bridge authors can implement this interface instead of BinaryLibrary to 
  get more precise control over bridging.
  For example it makes possible to use separated response handlers for different 
  requests.
  
- [`net.query_counterparties`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_net.md#query_counterparties) - allows to query and paginate through the list of accounts that the specified account 
 has interacted with, sorted by the time of the last internal message between accounts.   
  Subscription to counterparties collection is available via `net.subscribe_collection` function.

- Blockchain interaction reliability improvement (broadcast): library sends external inbound messages simultaneously 
  to the N randomly chosen endpoints. If all N endpoints failed to responce then library repeats 
  sending to another random N endpoints (except the failed one). 
  If all the available endpoints fail to respond then library throws error.
  The N parameter is taken from `config.network.sending_endpoint_count` (default is 2).

- Blockchain interaction reliability improvement (bad delivery list): library tracks endpoints 
  with bad message delivery (expired messages). These endpoints have lower priority when library chooses endpoints 
  to send message.
  
- **Debot module**:
    - Implementation of `Json` DeBot interface in DEngine.

## [1.12.0] – 2021-04-01

### New
- [`utils.compress_zstd`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_utils.md#compress_zstd) compresses data using Facebook's Zstandard algorithm.
- [`utils.decompress_zstd`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_utils.md#decompress_zstd) decompresses data using Facebook's Zstandard algorithm.
- **Debot module**:
    - `init` function that creates an instance of DeBot and returns DeBot metadata.
    - Dengine fetches metadata form DeBot by calling 2 mandatory functions: `getRequiredInterfaces` and `getDebotInfo`. This data is returned by `fetch` and `init` functions.
    - `approve` DeBot Browser callback which is called by DEngine to request permission for DeBot activities.

### Changed
- **Debot Module**:
    - [breaking] `fetch` function does't create an instance of debot. It returns DeBot metadata (`DebotInfo`).
    - [breaking] `start` function does't create an instance of debot. It accepts DeBot handle created in `init` function.

## [1.11.1] – 2021-03-15

### New
- Giver address in tests is calculated from secret key. Default values are provided for TON OS SE giver

## [1.11.0] – 2021-03-05

### New
- [`utils.calc_storage_fee`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_utils.md#calc_storage_fee) function to calculate account storage fee over a some time period.
- **Debot Module**:
    - Added unstable functions to `Sdk` interface: `getAccountsDataByHash`

## [1.10.2] – 2021-03-11

### Fixed
- `index.d.ts` files in `lib-` packages are refined to be more typed.
- export of the `account.ts` added to `core/index`.

## [1.10.1] – 2021-03-10

### New
- New high-level wrapper [Account.ts](packages/core/src/account.ts) that simplifies work with accounts:
   
  `Account` class is introduced that supports these high-level methods:
    - (static) `giver` - allows to specify a giver to be used in all deploy operations
    - `deploy` - deploys a contract
    - `run` - executes a contract on-chain
    - `runLocal` - executes a contract off-chain (on client side, contract state does not change) (execution is syncronized with the previously called `deploy` or `run` so that it is performed on the updated account state)
    - `getAddress` - returns account address
    - `getAccount`- returns all the data about the account in json format
    - `boc` - returns the account boc.
   
   `GiverContract` object is introduced that is ititialized with [TON OS SE Giver](https://github.com/tonlabs/tonos-se/tree/master/contracts#giver-v2) address and keys.

## [1.10.0] – 2021-03-04

### New
- Add optional field `src_address` to [`ParamsOfEncodeInternalMessage`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_abi.md#encode_internal_message).
- Field `abi` in [`ParamsOfEncodeInternalMessage`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_abi.md#encode_internal_message) is optional and can be `None` if `call_set` and `deploy_set` are  `None`.
- [`boc.encode_boc`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_boc.md#encode_boc) function provides ability to build and serialize any custom tree of cells.
  Application can use several base Builder serialization primitives like integers, bitstrings
  and nested cells.
- [`boc.get_blockchain_config`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_boc.md#get_blockchain_config) function can extract blockchain configuration from key block and also
from zerostate.
- [`tvm` module](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_tvm.md) functions download current blockchain configuration if `net` is initialized with
DApp Server endpoints. Otherwise [default configuration](https://github.com/tonlabs/ton-executor/blob/11f46c416ebf1f145eacfb996587891a0a3cb940/src/blockchain_config.rs#L214) is used.
- **Debot Module**:
    - Support for debot invoking in Debot Engine. `send` browser callback is used not only for interface calls but to invoke debots.
    - `start` and `fetch` functions returns debot ABI.
    - Added new built-in interface `Hex` which implements hexadecimal encoding and decoding.
    - Added unstable functions to `Sdk` interface: naclBox, naclBoxOpen, naclKeypairFromSecret, getAccountCodeHash.

### Changed
- Both `call_set` and `deploy_set` in [`ParamsOfEncodeInternalMessage`](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_abi.md#encode_internal_message) can be omitted. In this case `encode_internal_message` generates internal message with empty body.
- **Debot Module**:
    - `send` function accepts one argument - serialized internal message as string encoded into base64.
### Documentation
- [Debot browser app object](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_debot.md#AppDebotBrowser) and [signing box app object](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_crypto.md#appsigningbox) descriptions added
- functions-helpers for enum type variable creation for [Signer](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_abi.md#signer), [Abi](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_abi.md#abi), [ParamsOfAppDebotBrowser](mod_debot.md#paramsofappdebotbrowser)

### Fixed

-  doc generator: app object interface description, constructor functions-helpers for enum type variable creation, added new line in the end if api.json
- library libsecp256k1 upgraded to fix https://rustsec.org/advisories/RUSTSEC-2019-0027

## 1.9.0 Feb 19, 2021

### New

- `tuple_list_as_array` parameter in `tvm.run_get` function which controls lists representation.
Default is stack-like based on nested tuples. If set to `true` then returned lists are encoded as plain arrays.  Use this option if you receive this error on Web: "Runtime error. Unreachable code should not be executed..."
This reduces stack size requirements for long lists.
- `function_name` field of `CallSet` structure can be the name or **id (as string in hex starting with 0x)** of the called function. 
- Fields `config_servers`, `query_url`, `account_address`, `gas_used` added into specific errors' `ClientError.data` object.

### Fixed

- Binaries download links are now under https protocol
- If you receive this error on Web: "Runtime error. Unreachable code should not be executed..." in `run_get`, use the new parameter `tuple_list_as_array = true`. [See the documentation](https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_tvm.md#run_get). This may happen, for example, when elector contract contains too many participants

## 1.8.0 Feb 11, 2021

### New

- **Debot Module**:
    - Added new built-in interface `Msg` which allows to send external message to blockchain and sign it with supplied keypair.
    
### Fixed

- `crypto.hdkey_public_from_xprv` used compressed 33-byte form instead of normal 32-byte.

## 1.7.0 Feb 9, 2021
### New
- BOC cache management functions were introduced:
  - `boc.cache_set`, 
  - `boc.cache_get`  
  - `boc.cache_unpin` 
- Now functions that take boc as a parameter can also take a reference to boc cash instead so that it deсreases the number of boc serialization 
and deserializations which drastically improves performance of `run_tvm` and `run_executor` expecially in case of numerous calls on the same data. 
- `boc_cache` parameter in `tvm.run_tvm` and `tvm.run_executor` functions to save resulting messages and account BOCs into cache.
- `return_updated_account` flag parameter introduced in `tvm.run_tvm` and `tvm.run_executor` functions to return updated account state. Important: by default this flag is `false` and account data is not returned.
- `abi.encode_internal_message` function to encode an internal ABI-compatible message.
- **Debot Module**:
    - Support for get-methods and external calls in debots.
    Debots can send external inbound messages to destination contracts (signed - for external calls and unsigned - for get-methods) using native language syntax without actions.
    - Built-in debot interfaces (interfaces implemented by DEngine).
    Added two built-in interfaces: base64 and Sdk.
    - Added `DebotInterfaceExecutor` to automatically route messages to destination interfaces.
    - Debot's `fetch` function is optional now. New debots can implement only `start` function.

## 1.6.3 Feb 4, 2021
### Fixed
- Expired message wasn't retried if local execution succeeded.

## 1.6.0 Jan 29, 2021
### New
- `nacl_sign_detached_verify` function to verify detached signature.
- `aggregate_collection` function as a wrapper for GraphQL aggregation queries.
- `batch_query` function performs multiple queries per single fetch.
- Active endpoint invalidation in case of network error occuring.
- `network.network_retries_count` config parameter is deprecated. `network.max_reconnect_timeout` is introduced that allows to specify maximum network resolving timeout. Default value is 2 mins. 
- `initial_pubkey` field in `DeploySet` to specify public key instead of one from TVC file or provided by signer.
- Support for debot interfaces:
  - `send` Browser Callback to send messages with interface calls to Browser.
  - new variant `ParamsOfAppDebotBrowser::Send`.
  - `send` API function to send messages from Browser to Debot.
  - `run_output.rs` - internal structure RunOutput to filter messages generated by debot to 4 categories: interface calls, external calls, get-method calls and invoke calls.

### Fixed
- Device time synchronization is checked only in `send_message`. Data querying does not require proper time now

## 1.5.3 Jan 14, 2021

### Fixed
- node binary filename for windows

## 1.5.2 Dec 30, 2020

### New
- *.d.ts type declarations in `lib-react-native`, `lib-node`, `lib-web`.

### Fixed
- `net` module functions wait for `net.resume` call instead of returning error if called while the module is suspended


## 1.5.0 Dec 25, 2020

### New
- `reconnect_timeout` parameter in `NetworkConfig`.
- `endpoints` parameter in `NetworkConfig`. It contains the list of available server addresses to connect. SDK will use one them with the least connect time. `server_address` parameter is still supported but `endpoints` is prevailing.
- `net.fetch_endpoints` function to receieve available endpoints from server.
- `net.set_endpoints` function to set endpoints list for using on next reconnect.
- `ErrorCode` type in each module spec in `api.json`.

## 1.4.1 Dec 22, 2020

### New
- `net.find_last_shard_block` function returning account shard last block ID.
- `boc.get_code_from_tvc` function extracting contract code from TVC image.
- **Debot Module:**
  - Add new variant `ParamsOfAppDebotBrowser::SwitchCompleted` to notify browser when all context actions are shown.

## 1.3.3 - Dec 16, 2020

### Fix
- `lib-react-native` native module package name was changed to `tonlabs.tonclient`.

## 1.3.2 - Dec 11, 2020

### Fix
- `lib-web` index-template matches the documentation now

## 1.3.1 - Dec 9, 2020

### Fix
- AppObject wasn't working.  

## 1.3.0 - Dec 8, 2020

### New
- `net.query` method . Performs custom graphql query that can be copied directly from the playground.
- `net.suspend` and `net.resume` methods for disabling and enabling network activity. One of the possible use-cases is to manage subscriptions when a mobile application is brought to the background and into the foreground again.
- Inline JSDoc comments.

### Fix
- Failed downloads issues.  

## 1.2.1 - Dec 4, 2020

### Fix
- Publish npm packages without tests

## 1.2.0 - Dec 3, 2020

### New
- Thin binding: JS binding has become very thin - all the implementation, including network layer, was moved to the core [TON-SDK library](https://github.com/tonlabs/TON-SDK). Find out all the key changes in the [core library CHANGELOG](https://github.com/tonlabs/TON-SDK/blob/master/CHANGELOG.md), starting from 1.0.0 release.
- Mono repository: now all the platform packages are developed in the same repository, platform bridges were also moved here from core repository
- Typescript: v1 JS binding is written in Typescript
- Low level API: at the moment the library provides only low level API, **we plan to extend it with high level handy wrappers in the future releases.**
- new API reference: [core api reference documentation](https://github.com/tonlabs/TON-SDK/blob/master/docs/modules.md) provides typescript samples of function signatures. 

## 0.26.2 - Sep 21, 2020
### Fixed
- Added `Sensor.sol` contract for recompilation tests

## 0.26.1 - Sep 15, 2020
### Fixed
- `contracts.createUnsignedRunMessage` must migrate public key to header.pubkey when possible.

## 0.26.0 - August 20, 2020
### New
- All message creation functions (`createDeployMessage`, `createRunMessage`, `run`, `deploy`) now are accept 
  the optional `signingBox` as an alternative to the `keyPair`.
- `getCryptoBox` method of the `contracts` module. It creates a default `TONCryptoBox` implementation 
   that uses the core crypto module.
- More diagnostic fields `configServer`, `queryUrl` in error object. 

## 0.25.5 - August 5, 2020
### Fixed
- `waitForTransaction` didn't use prev_alt_ref for block walking 

## 0.25.4 - July 31, 2020
### Fixed
- Ability to use `crypto` module before `setup`. 

## 0.25.3 - July 29, 2020
### Fixed
- Fix test. 

## 0.25.2 - July 26, 2020
### Fixed
- Error reporting in test suite on react-native testApp. 

## 0.25.1 - July 26, 2020
### Bug fix
- TimeoutOverflowWarning: 2147488647 does not fit into a 32-bit signed integer was fixed

## 0.25.0 - July 8, 2020

### New
- `TONContractMessage` includes the `address` field (equals to the `dst`)
- Support for core contexts.
- Test suite have been refactored and can be easily adopted to run on several Js targets.
- `networkTimeout` configuration parameter for retrying GraphQL requests in case of network errors. Default value is `0` which means infinite retries until network connection will be succeeded.
- New message processing tracing. Client starts root processing span with `traceId` and `spanId` calculated from messageId. Other components can report child span without passing parent context through pipeline. 
- `messageProcessingTimeoutGrowFactor` field removed from config since it's not used 
- graphql queries can be forcible aborted on a timeout in case of a half-open TCP connection,

## 0.24.0 - June 3, 2020
### New
- Detailed errors produced by core library.
- Optional parameter `fullRun` for `runLocal` method allows to emulate an execution on a real node with all required checks and fees calculations. 
- Optional parameter `account` for `runLocal` method allows to provide the specified account data instead of loading them from a blockchain. 
- Optional result field `account` for `runLocal` and `runMessageLocal` methods returns state of an account after contract execution has finished. Presented only when the `fullRun` parameter has specified.  
- Method `runMessageLocal` as a replacement for the `processRunMessageLocal` with `fullRun` and `account` parameters. 
- `1003` error on contract run is replaced with more specific `1010`-`1012` errors
 
## 0.23.2 - May 25, 2020
### New
- Detailed errors instead of 1006.
- Babel runtime dependency has returned.
 
## 0.23.1 - May 21, 2020
### New
- Methods `serverNow()` and `serverTimeDelta()` of `TONClient` returns current server time.
- Check for a clock is out of sync before sending the first message (fail if out of sync).
- Method `waitForRunTransaction` of `contracts` module. 
- Method `waitForDeployTransaction` of `contracts` module. 
- Method `isDeployed` of `contracts` module. 
 
## 0.23.0 - May 15, 2020
### New
- Method `runGet` of `contracts` module executes get method on a local tvm.
- Method `arrayFromCONS` of `contracts` module converts CONS-list to JS arrays.
 
## 0.22.2 - May 3, 2020
### New
- keep-alive checking support for graphql subscriptions
 
## 0.22.1 - Apr 29, 2020
### Fixed
- GraphQL query will retry if network error has occurred

### New
- `aggregate` method of `TONQueriesModuleCollection` 
 
## 0.22.0 - Apr 20, 2020
### Featured
- Aggregation queries

### New
- `aggregate` method of `TONQueriesModuleCollection` 
 
## 0.21.26 - Apr 7, 2020
### Fixed
- `blocks_signatures` collection queries failed

## 0.21.25 - Apr 4, 2020
### New
- `blocks_signatures` queries collection


## 0.21.24 - Mar 27, 2020
### Featured
- Stability fixes
- Operation ID in queries 

### New
- `operationId` parameter to waitFor and query

### Fixed
- message expiration check was after sending request to node
- operationId is used to reduce inactive server listeners 


## 0.21.23 - Mar 24, 2020
### Featured
- Stability fixes 

### Fixed
- guard client initialization from several simultaneous starts. 

## 0.21.22 - Mar 23, 2020
### Featured
- Ability to use web sockets for queries and mutations 

### New
- config parameter `useWebSocketForQueries`

### Fixed
- WebSocket reconnect log record changed from `error` to `info` 

## 0.21.1 - Mar 19, 2020
### Featured
- Stability improvements 

### New
- log to console WebSocket errors and reconnections
- config parameters `retriesCount` and `transactionTimeout` have removed
- config parameters `messageRetriesCount`, `messageExpirationTimeout`, `messageExpirationTimeoutGrowFactor`, `messageProcessingTimeout`, `messageProcessingTimeoutGrowFactor`, `waitForTimeout`
- `run` method returns `transactions` with included fields `compute.gas_fees` and `compute.gas_used`
- client will try to use all addresses from `servers` config if the first server fails 

### Fixed
- enhanced reconnection procedure when WebSocket connection has failed 
- expiration retries didn't work

## 0.21.0 - Mar 12, 2020
### Featured
- ABI version 2 supported. See specification at https://docs.ton.dev
- Message expiration implemented. Check [usage guide](https://docs.ton.dev/86757ecb2/p/88321a-message-expiration-time)

### New
- `getGetDeployData` returns full contract address

## 0.20.100 - Feb 17, 2020
### New
- `registerAccessKey` parameters passed as structure. 
- `restrictToAccounts` option for access keys.
- `parseMessage` function for parsing message BOC into JSON.
- `deploy` and `processDeployMessage` functions now check the account state before sending message and return `alreadyDeployed = true` if account is already active.

## 0.20.2 - Feb 12, 2020
### Fixed
- `tracer` config parameter caused setup error (circular JSON).

## 0.20.1 - Feb 10, 2020
### Featured
- SDK Authorization support

### New
- `authorization` config parameter to specify SDK access key.
- `registerAccessKey` customer account management function.
- `revokeAccessKey` customer account management function.

### Fixed
- flow type definitions `types.js` have actualized.

## 0.20.0 - Feb 4, 2020

### New
- Open Tracing (jaeger) integration:
    1) Optional `tracer` config parameter was added. If specified, must point to opentracing.Tracer object. If not specified then opentracing `noop` tracer will be used. 
    2) TONClient.trace method to encapsulate some user code into open trace span:
        ```javascript
        async function foo(..., parentSpan) {
            return client.trace('Foo', async (fooSpan) => {
                fooSpan.setTag('params', ...);
                ...
                await client.deploy(..., fooSpan);
                ...
                await client.run(..., fooSpan);
                ...
            }, parentSpan);
        }
        async function bar(..., parentSpan) {
            return client.trace('Bar', async (barSpan) => {
                barSpan.setTag('params', ...);
                ...
                await client.deploy(..., barSpan);
                ...
                await foo(..., barSpan);
                ...
            }, parentSpan);
        }
        ````
    3) Example of creating jaeger tracer can be found in `init-tests.ts` file.
    4) All SDK functions now have hexademical address representation length check.
## 0.19.1 - January 28, 2020

### Fixed
- stability improvements (WS connection timeouts was increased)

## 0.19.0 - January 23, 2020

### New
- Waiting for account update moved from deploy to local run functions.
- More detailed verbose log.
- Check internal messages from giver (in tests).
- Functions running contracts locally (`runLocal`, `calcRunFees`, `calcMsgProcessFees`) have new parameters for waiting particular account state to run.

### Fixed
- FIX: set query timeout measurement in ms (was sec) to supports GraphQL 0.21.0.

### Breaking Compatibility
- Because waiting for account update removed from `deploy`, developers must wait for account manually if required.
