import entry from './entry';
import { TvmClient } from '@tvmsdk/core';
import { libReactNative } from '@eversdk/lib-react-native';
import { AppRegistry } from 'react-native';
import App from './App';
entry();
import {name as appName} from './app.json';
TvmClient.useBinaryLibrary(libReactNative);
AppRegistry.registerComponent(appName, () => App);
