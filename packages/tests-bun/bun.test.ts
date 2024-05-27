import { expect, test } from "bun:test";

import { TonClient } from "@eversdk/core";
import { libWeb, libWebSetup } from "@eversdk/lib-web";

test("init client with lib-web and separate worker disabled", async () => {
	// Disable separate worker
	libWebSetup({
		disableSeparateWorker: true,
		binaryURL: Bun.pathToFileURL("../lib-web/eversdk.wasm"),
	});
	//

	TonClient.useBinaryLibrary(libWeb);

	const client = new TonClient();
	const keys = await client.crypto.generate_random_sign_keys();
	expect(keys.public.length > 12).toBeTrue();
});

test("init client with lib-web and separate worker enabled", async () => {
	libWebSetup({
		binaryURL: Bun.pathToFileURL("../lib-web/eversdk.wasm"),
	});
	//

	TonClient.useBinaryLibrary(libWeb);

	const client = new TonClient();
	const keys = await client.crypto.generate_random_sign_keys();
	expect(keys.public.length > 12).toBeTrue();
});
