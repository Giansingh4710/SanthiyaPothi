import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import {Store} from './redux/store';

import HomeScreen from './src/mainScreenList';
import FolderToPdfs from './src/foldersToPdf';
import OpenPdf from './src/openPdf';
import SettingsPage from './src/settingsPage/settings';
import FolderToPdfs2 from './src/subFolder';
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings Page" component={SettingsPage} />
          <Stack.Screen name="BanisList" component={FolderToPdfs} />
          <Stack.Screen name="BanisList2" component={FolderToPdfs2} />
          <Stack.Screen name="OpenPdf" component={OpenPdf} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
