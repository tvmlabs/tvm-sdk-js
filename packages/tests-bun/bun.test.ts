import { expect, test } from "bun:test";

import { TonClient } from "@eversdk/core";
import { libWeb, libWebSetup } from "@eversdk/lib-web";

test("init client with lib-web and separate worker disabled", async () => {
	// Disable separate worker
	libWebSetup({
		disableSeparateWorker: true,
		binaryURL: Bun.pathToFileURL("node_modules/@eversdk/lib-web/eversdk.wasm").toString(),
	});

	TonClient.useBinaryLibrary(libWeb);

	const client = new TonClient();
	const keys = await client.crypto.generate_random_sign_keys();
	expect(keys.public.length > 20).toBeTrue();

    const count = 12;
    const { phrase } = await client.crypto.mnemonic_from_random({
        word_count: count,
        dictionary: 1,
    });
    expect(phrase.split(" ").length).toBe(count);
});

test.todo("init client with lib-web and separate worker enabled", async () => {
	libWebSetup({
		binaryURL: Bun.pathToFileURL("../lib-web/eversdk.wasm").toString(),
	});

	TonClient.useBinaryLibrary(libWeb);

	const client = new TonClient();
	const keys = await client.crypto.generate_random_sign_keys();
	expect(keys.public.length > 12).toBeTrue();
});
