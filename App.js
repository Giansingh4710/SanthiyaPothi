import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import {Store} from './redux/store';

import HomeScreen from './src/mainScreenList';
import FolderToPdfs from './src/foldersToPdf';
import OpenPdf from './src/openPdf';
const Stack = createStackNavigator();

//apk BUILD SUCCESSFUL
function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // options={{title: 'ਵਾਹਿਗੁਰੂਜੀਕਾਖਾਲਸਾਵਾਹਿਗੁਰੂਜੀਕੀਫਤੇ||'}}
          />
          <Stack.Screen name="BanisList" component={FolderToPdfs} />
          <Stack.Screen
            // options={{headerShown: false}}
            name="OpenPdf"
            component={OpenPdf}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
