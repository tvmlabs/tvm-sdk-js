/*
 * Compile-time guard for fields that modules.ts makes required by hand.
 *
 * modules.ts is generated from tvm-sdk's tools/api.json by tools/ts-code.ts;
 * api.json comes from the ApiType derive in tvm-sdk's api/derive. The derive
 * marks every #[serde(default)] field optional, so regenerating modules.ts
 * makes these fields optional again, and then this file stops compiling:
 * - dapp_id in ParamsOfSendMessage and ParamsOfProcessMessage: tvm_client
 *   rejects the call without it (ProcessingErrorCode.DappIdRequired).
 * - tx_hash in ParamsOfWaitForTransaction: the call fails without it
 *   (ProcessingErrorCode.InvalidData). The key is required but the value may
 *   be undefined, so ResultOfSendMessage.tx_hash can be passed as is.
 * - account_id and dapp_id in ResultOfSendMessage: send_message always fills
 *   them.
 *
 * Not checked here, and lost on regeneration without a compile error:
 * - doc edits: the tx_hash remarks in ResultOfSendMessage and
 *   ParamsOfWaitForTransaction, the shard_block_id @deprecated tag, the
 *   sending_endpoints remark;
 * - ClientError (the generator emits Box<ClientErrorInner>) and the
 *   MessageMonitoring* docs, both kept from the pre-3.0 modules.ts.
 *
 * The type is exported because noUnusedLocals rejects an unused alias.
 */

import {
    ParamsOfProcessMessage,
    ParamsOfSendMessage,
    ParamsOfWaitForTransaction,
    ResultOfSendMessage,
} from "./modules";

type IsRequired<T, K extends keyof T> = {} extends Pick<T, K> ? false : true;
type Assert<T extends true> = T;

export type HandEditedRequiredFields = [
    Assert<IsRequired<ParamsOfSendMessage, "dapp_id">>,
    Assert<IsRequired<ParamsOfProcessMessage, "dapp_id">>,
    Assert<IsRequired<ParamsOfWaitForTransaction, "tx_hash">>,
    Assert<IsRequired<ResultOfSendMessage, "account_id">>,
    Assert<IsRequired<ResultOfSendMessage, "dapp_id">>,
];
