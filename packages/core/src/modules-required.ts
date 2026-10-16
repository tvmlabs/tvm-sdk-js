/*
 * Compile-time guard for fields that modules.ts makes required by hand.
 *
 * The generator marks every #[serde(default)] field optional, so regenerating
 * modules.ts from api.json makes these fields optional again, and then this
 * file stops compiling:
 * - dapp_id in ParamsOfSendMessage and ParamsOfProcessMessage: tvm_client
 *   rejects the call without it (ProcessingErrorCode.DappIdRequired).
 * - account_id and dapp_id in ResultOfSendMessage: send_message always fills
 *   them.
 *
 * Doc-only hand edits in ParamsOfWaitForTransaction are not checked here and
 * are lost on regeneration: the tx_hash remark, the shard_block_id
 * @deprecated tag and the sending_endpoints remark.
 */

import {
    ParamsOfProcessMessage,
    ParamsOfSendMessage,
    ResultOfSendMessage,
} from "./modules";

type IsRequired<T, K extends keyof T> = {} extends Pick<T, K> ? false : true;
type Assert<T extends true> = T;

export type HandEditedRequiredFields = [
    Assert<IsRequired<ParamsOfSendMessage, "dapp_id">>,
    Assert<IsRequired<ParamsOfProcessMessage, "dapp_id">>,
    Assert<IsRequired<ResultOfSendMessage, "account_id">>,
    Assert<IsRequired<ResultOfSendMessage, "dapp_id">>,
];
