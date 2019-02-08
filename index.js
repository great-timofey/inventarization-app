/** @format */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings([
  'unknown call: "relay:check"',
  "Warning: Can't perform a React state update on an unmounted component.",
  'Warning: Cannot update during an existing state transition (such as within `render`).',
]);
AppRegistry.registerComponent(appName, () => App);
