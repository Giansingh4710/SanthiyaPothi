import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';

import {CheckBox, Icon} from 'react-native-elements';

import {useSelector, useDispatch} from 'react-redux';
// import {barStyles, allColors} from '../assets/styleForEachOption';

export default function AddedFiles({navigation, route}) {
  async function pickDoc() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const name = res[0].name;
      const uri = res[0].uri;
      //   console.log(res);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pickDoc()}>
        <Text>Hi Added container</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
