import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {setTheState} from '../redux/actions';
import {initialState} from '../redux/reducers';
import {barStyles, allColors} from '../assets/styleForEachOption';
import {folderToFileData} from '../assets/longData';

function HomeScreen({navigation, route}) {
  const dispatch = useDispatch();
  let state = useSelector(theState => theState.theReducer);
  React.useEffect(() => {
    async function getData() {
      try {
        const theStringState = await AsyncStorage.getItem('state');
        let theState;
        if (theStringState) {
          theState = JSON.parse(theStringState);
          // console.log(theState);
          console.log('got state that was previously saved');
        } else {
          console.log('there is nothing is state');
          theState = initialState;
        }
        state = theState;
        dispatch(setTheState(theState));
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }
    getData();
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
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
  });

  const theColors = allColors[state.darkMode].mainScreenList;

  const styles = StyleSheet.create({
    ...barStyles[state.darkMode].barStyle,
    container: {
      // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
      height: '100%',
    },
    scroll: {
      width: '100%',
      // height: '80%',
    },
    headerBtns: {
      flex: 1,
      padding: 10,
    },
    icons: {
      // flex: 1,
      // padding: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.scroll}>
        <FlatList
          keyExtractor={item => item.title} //name of each item like 'Bai Vaara'
          renderItem={({item}) => {
            return (
              <EachFolderItem
                item={item}
                styles={styles}
                state={state}
                navigation={navigation}
              />
            );
          }}
          data={[
            ...folderToFileData,
            {...state.addedPdfs},
            {
              title: 'ਪਾਠ Hajari',
            },
          ]}
        />
      </View>
    </View>
  );
}

function EachFolderItem({item, styles, state, navigation}) {
  return (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          const theList =
            item.title == 'Added PDFs' ? state.addedPdfs.list : item.list;
          navigation.navigate('BanisList', {
            list: theList,
            folderTitle: item.title, //name of the bar clicked on
          });
        }}>
        <Icon style={styles.icons} name="folder-outline" type="ionicon" />
        <Text style={styles.titleText}>{item.title}</Text>
        <Icon
          style={styles.icons}
          name="arrow-forward-outline"
          type="ionicon"
        />
      </TouchableOpacity>
      <View style={styles.gap}></View>
    </View>
  );
}
export default HomeScreen;
