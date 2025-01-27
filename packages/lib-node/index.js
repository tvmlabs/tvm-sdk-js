/*
 * Copyright 2018-2020 TON Labs LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at:
 *
 * http://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

function getHomeAddonPath() {
    const binVersion = process.env.TON_CLIENT_BIN_VERSION || (require("./package.json").version).split('.').slice(0, 2).join('_');
    const binariesHomePath = path.resolve(os.homedir(), "TODO: define alternative binaries local path", "binaries", binVersion);
    return path.resolve(binariesHomePath, "eversdk.node");
}

function loadAddon() {
    try {
        return require("./tvmsdk.node");
    } catch (error) {
        if (fs.existsSync(path.resolve(__dirname, "tvmsdk.node"))) {
            throw error;
        }
    }
  //  return require(getHomeAddonPath());
}

module.exports = {
    libNode: loadAddon,
};
