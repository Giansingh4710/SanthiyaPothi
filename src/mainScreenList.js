import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {setTheState} from '../redux/actions';
import {initialState} from '../redux/reducers';
import {allColors} from '../assets/styleForEachOption';
import {BarOption} from '../assets/components/baroption';
import {RightOfHeader} from '../assets/components/rightOfHeader';
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
      headerTitleStyle: {
        color: state.darkMode ? 'white' : 'black',
      },
      headerRight: () => (
        <RightOfHeader
          state={state}
          icons={[
            {
              name: 'open-outline',
              action: () => {
                console.log('shabad are');
              },
            },
            {
              name: 'shuffle-outline',
              action: () => {
                const items = allListItems;
                const randItem =
                  items[Math.floor(Math.random() * items.length)];
                const theList =
                  randItem.title == 'Added PDFs'
                    ? state.addedPdfs.list
                    : randItem.list;
                navigation.navigate('BanisList', {
                  list: theList,
                  folderTitle: randItem.title, //name of the bar clicked on
                });
              },
            },
            {
              name: 'settings-outline',
              action: () => {
                navigation.navigate('Settings Page');
              },
            },
          ]}
        />
      ),
    });
  });
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
      height: '100%',
    },
    scroll: {
      width: '100%',
      // height: '80%',
    },
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
              <BarOption
                state={state}
                left={
                  <Icon
                    name="folder-outline"
                    type="ionicon"
                    color={state.darkMode ? 'white' : 'black'}
                  />
                }
                text={item.title}
                right={
                  <Icon
                    name="arrow-forward-outline"
                    type="ionicon"
                    color={state.darkMode ? 'white' : 'black'}
                  />
                }
                onClick={() => {
                  const theList =
                    item.title == 'Added PDFs'
                      ? state.addedPdfs.list
                      : item.list;
                  navigation.navigate('BanisList', {
                    list: theList,
                    folderTitle: item.title, //name of the bar clicked on
                  });
                }}
              />
            );
          }}
          data={allListItems}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
