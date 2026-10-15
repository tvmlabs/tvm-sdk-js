/*
 * Compile-time guard for hand edits in modules.ts.
 *
 * tvm_client rejects send_message and process_message without dapp_id
 * (ProcessingErrorCode.DappIdRequired), but api.json marks the field optional
 * because the Rust struct uses #[serde(default)]. modules.ts makes it required
 * by hand. Regenerating modules.ts from api.json reverts that, and then this
 * file stops compiling.
 */

import { ParamsOfProcessMessage, ParamsOfSendMessage } from "./modules";

type IsRequired<T, K extends keyof T> = {} extends Pick<T, K> ? false : true;
type Assert<T extends true> = T;

export type HandEditedRequiredFields = [
    Assert<IsRequired<ParamsOfSendMessage, "dapp_id">>,
    Assert<IsRequired<ParamsOfProcessMessage, "dapp_id">>,
];
