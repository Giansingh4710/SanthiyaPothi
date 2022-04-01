import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native';
import {Icon} from 'react-native-elements';

export default function ShabadScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
