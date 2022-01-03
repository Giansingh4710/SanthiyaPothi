import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';

import {CheckBox, Icon} from 'react-native-elements';

import {useSelector, useDispatch} from 'react-redux';
import {setCheckBox, unCheckBoxes} from '../redux/actions';
import {allColors, barStyle, headerColor} from '../assets/styleForEachOption';

function EachBani(
  navigation,
  item,
  state,
  dispatch,
  setList,
  fileTitle,
  styles,
) {
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
          containerStyle={{
            borderRadius: 10,
            padding: 10,
            backgroundColor: 'black',
          }}
          onPress={() => {
            dispatch(setCheckBox(item.title));
            if (fileTitle === 'ਪਾਠ Hajari') {
              setTheList();
            }
          }}
          size={20}
          textStyle={{
            fontSize: 10,
            height: 20,
            color: 'white',
          }}
          title="Not Done"
          titleProps={{}}
          uncheckedColor="#F00"
        />
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

  const styles = allColors[state.darkMode].barStyle;

  React.useEffect(() => {
    setList(
      'ਪਾਠ Hajari' !== fileTitle
        ? route.params.list
        : route.params.list.map(bani => {
            return {title: bani[0]};
          }),
    );

    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerTitle: () => <Text>{fileTitle}</Text>,
      headerRight: () =>
        fileTitle !== 'ਪਾਠ Hajari' ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#077b8a',
              padding: 10,
              borderRadius: 10,
              right: 14,
            }}
            onPress={() => {
              dispatch(unCheckBoxes(fileTitle));
            }}>
            <Text>Uncheck All</Text>
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
            styles,
          );
        }}
        data={list}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   ...barStyle,
// });
