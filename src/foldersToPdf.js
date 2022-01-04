import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';

import {CheckBox, Icon} from 'react-native-elements';

import {useSelector, useDispatch} from 'react-redux';
import {setCheckBox} from '../redux/actions';
import {barStyles, allColors} from '../assets/styleForEachOption';

export default function FolderToPdfs({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const folderTitle = route.params.folderTitle;
  const baniyaList = route.params.list;
  const styles = barStyles[state.darkMode].barStyle;

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerTitle: () => <Text>{folderTitle}</Text>,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.headerBtns} onPress={() => {}}>
            <Icon name="shuffle-outline" type="ionicon"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtns}
            onPress={() => {
              navigation.navigate('Settings Page');
            }}>
            <Icon name="settings-outline" type="ionicon"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          return EachBani(navigation, item, styles, state, dispatch);
        }}
        data={baniyaList}
      />
    </View>
  );
}

function EachBani(navigation, item, styles, state, dispatch) {
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
