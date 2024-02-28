import { TvmClient } from "@tvmsdk/core"
import { getDefaultEndpoints, sleep } from "./utils"

const subscription = async (
    sdk: TvmClient,
    subscription: string,
    options: { count: number },
) => {
    let eventCounter = 0
    const eventListener = (doc: unknown) => {
        eventCounter++
        console.dir(doc, { showHidden: false, depth: null })
    }

    const subscribe = await sdk.net.subscribe({ subscription }, eventListener)

    while (subscribe.handle) {
        await sleep(200)
        if (options.count > 0 && eventCounter >= options.count) {
            await sdk.net.unsubscribe(subscribe)
            break
        }
    }
}

const query = async (sdk: TvmClient, query: string) => {
    const result = await sdk.net.query({ query })
    console.dir(result, { showHidden: false, depth: null })
}

export async function graphql(request: string, options: unknown) {
    const sdk = new TvmClient({ network: { endpoints: getDefaultEndpoints() } })
    try {
        if (request.startsWith("query")) {
            await query(sdk, request)
        } else if (request.startsWith("subscription")) {
            await subscription(sdk, request, Object(options))
        }
    } finally {
        sdk.close()
    }
}
