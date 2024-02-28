import entry from './entry';
import { TvmClient } from '@tvmsdk/core';
import { libWeb, libWebSetup } from "@tvmsdk/lib-web";
import { TestsRunner } from "@tvmsdk/tests";

entry();
libWebSetup({
    disableSeparateWorker: true
})
TvmClient.useBinaryLibrary(libWeb);

window.addEventListener('load', () => {
    (async () => {
        try {
            await TestsRunner.run(
                ({ version, passed, failed, finished }) => {
                    document.body.innerHTML = `Core Version ${version}<br />Passed: ${passed}<br />Failed: ${failed}<br />${finished ? 'Finished' : ''}`;
                },
                (...args) => console.log(...args),
            );
        } catch (error) {
            console.log('>>>', error);
            document.body.innerHTML = 'Error';
        }
    })();
    // startTests(() => {});
});
