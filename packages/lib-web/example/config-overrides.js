const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    webpack: function (config, env) {
        config.plugins.push(
            new CopyWebpackPlugin({
                patterns: [{ from: "./node_modules/@tvmsdk/lib-web/eversdk.wasm" }],
            })
        );
        return config;
    },
};
