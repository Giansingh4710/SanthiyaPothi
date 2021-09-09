import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  LogBox,
  Button,
} from 'react-native';

import {CheckBox, Icon} from 'react-native-elements';

import {barStyle} from '../assets/styleForEachOption';
import {useSelector, useDispatch} from 'react-redux';
import {setCheckBox, unCheckBoxes} from '../redux/actions';

function EachBani(navigation, item, state, dispatch) {
  return (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('OpenPdf', {pdfTitle: item.title});
        }}>
        <Text style={styles.titleText}>{item.title}</Text>
        {/* {state.checkBoxes[item.title] ? ( */}
        <CheckBox
          // checked={checked}
          checked={state.checkBoxes[item.title].checked}
          checkedColor="#0F0"
          // checkedTitle="Great!"
          checkedTitle="ਸੰਪੂਰਨ"
          onIconPress={() => {
            dispatch(setCheckBox(item.title));
          }}
          onPress={() => {
            dispatch(setCheckBox(item.title));
          }}
          size={20}
          textStyle={{
            fontSize: 20,
            // padding: 1,
            // backgroundColor: 'yellow',
            height: 30,
          }}
          title="Not Done"
          titleProps={{}}
          uncheckedColor="#F00"
        />
        {/* ) : (
          <View />
        )} */}
        <Icon
          style={{flex: 1}}
          name="arrow-forward-outline"
          type="ionicon"
          // color="#7FFFD4"
          // size={100}
        />
      </TouchableOpacity>
      <View style={styles.gap}></View>
    </View>
  );
}

export default function FolderToPdfs({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const fileTitle = route.params.fileTitle;
  const list =
    'ਪਾਠ Hajari' !== fileTitle
      ? route.params.list
      : route.params.list.map(bani => {
          return {title: bani[0]};
        });
  React.useEffect(() => {
    navigation.setOptions({
      title: fileTitle,
      headerRight: () =>
        fileTitle !== 'ਪਾਠ Hajari' ? (
          <TouchableOpacity
            style={{backgroundColor: '#f8f8', padding: 10}}
            onPress={() => {
              dispatch(unCheckBoxes(fileTitle));
            }}>
            <Text>Unckeck All</Text>
          </TouchableOpacity>
        ) : (
          <View />
        ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          //each item is an Object that has 1 key: title
          return EachBani(navigation, item, state, dispatch);
        }}
        data={list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ...barStyle,
});
