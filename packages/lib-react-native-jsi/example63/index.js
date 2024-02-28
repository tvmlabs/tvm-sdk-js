/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import {TvmClient} from '@tvmsdk/core';
import {name as appName} from './app.json';
import {libReactNativeJsi} from '@tvmsdk/lib-react-native-jsi';

// eslint-disable-next-line react-hooks/rules-of-hooks
TvmClient.useBinaryLibrary(libReactNativeJsi);

AppRegistry.registerComponent(appName, () => App);
