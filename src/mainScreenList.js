import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {setTheState} from '../redux/actions';
import {initialState} from '../redux/reducers';
import {barStyles, allColors} from '../assets/styleForEachOption';
import {BarOption} from '../assets/otherScreens/baroption';
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
          <TouchableOpacity
            style={styles.headerBtns}
            onPress={() => {
              const items = allListItems;
              const randItem = items[Math.floor(Math.random() * items.length)];
              const theList =
                randItem.title == 'Added PDFs'
                  ? state.addedPdfs.list
                  : randItem.list;
              navigation.navigate('BanisList', {
                list: theList,
                folderTitle: randItem.title, //name of the bar clicked on
              });
            }}>
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
    iconsInBar: {
      // flex: 1,
      // padding: 10,
    },
    //titleText:{
    //}
  });

  const allListItems = [
    ...folderToFileData,
    {...state.addedPdfs},
    {
      title: 'ਪਾਠ Hajari',
    },
  ];
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
          data={allListItems}
        />
      </View>
    </View>
  );
}

function EachFolderItem({item, state, navigation}) {
  return (
    <BarOption
      left={<Icon name="folder-outline" type="ionicon" />}
      text={item.title}
      right={<Icon name="arrow-forward-outline" type="ionicon" />}
      onClick={() => {
        const theList =
          item.title == 'Added PDFs' ? state.addedPdfs.list : item.list;
        navigation.navigate('BanisList', {
          list: theList,
          folderTitle: item.title, //name of the bar clicked on
        });
      }}
    />
  );
}
export default HomeScreen;
