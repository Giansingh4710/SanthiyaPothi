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

function EachBani(navigation, item, state, dispatch, setList, fileTitle) {
  function setTheList() {
    setList(
      Object.entries(state.checkBoxes)
        .filter(bani => {
          return bani[1].currentAng !== 1 && bani[1].checked === false;
        })
        .map(bani => {
          return {title: bani[0]};
        }),
    );
  }
  return (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('OpenPdf', {pdfTitle: item.title});
        }}>
        <Text style={styles.titleText}>{item.title}</Text>

        <CheckBox
          checked={state.checkBoxes[item.title].checked}
          checkedColor="#0F0"
          checkedTitle="ਸੰਪੂਰਨ"
          onPress={() => {
            dispatch(setCheckBox(item.title));
            if (fileTitle === 'ਪਾਠ Hajari') {
              setTheList();
            }
          }}
          size={20}
          textStyle={{
            fontSize: 20,
            height: 30,
          }}
          title="Not Done"
          titleProps={{}}
          uncheckedColor="#F00"
        />
        <Icon style={{flex: 1}} name="arrow-forward-outline" type="ionicon" />
      </TouchableOpacity>
      <View style={styles.gap}></View>
    </View>
  );
}

export default function FolderToPdfs({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const [list, setList] = React.useState();

  const fileTitle = route.params.fileTitle;
  React.useEffect(() => {
    setList(
      'ਪਾਠ Hajari' !== fileTitle
        ? route.params.list
        : route.params.list.map(bani => {
            return {title: bani[0]};
          }),
    );

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
          return EachBani(
            navigation,
            item,
            state,
            dispatch,
            setList,
            fileTitle,
          );
        }}
        data={list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ...barStyle,
});
