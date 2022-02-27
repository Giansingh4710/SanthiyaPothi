import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
// your entry point
import {MenuProvider} from 'react-native-popup-menu';

// somewhere in your app
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function TEST() {
  return (
    <MenuProvider>
      <YourComponent />
    </MenuProvider>
  );
}

const YourComponent = () => (
  <View>
    <Text>Hello world!</Text>
    <Menu>
      <MenuTrigger triggerOnLongPress>
        <Text>YOO</Text>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text="Save" />
        <MenuOption onSelect={() => alert(`Delete`)}>
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert(`Not called`)}
          disabled={true}
          text="Disabled"
        />
      </MenuOptions>
    </Menu>
  </View>
);
