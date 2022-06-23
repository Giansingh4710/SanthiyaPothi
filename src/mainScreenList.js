import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {Icon, CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {setTheState} from '../redux/actions';
import {initialState} from '../redux/reducers';
import {allColors} from '../assets/styleForEachOption';
import {BarOption} from '../assets/components/baroption';
import {RightOfHeader} from '../assets/components/rightOfHeader';

import {
    setCheckBox,
    deleteAddedItem,
    addNdeletePdf,
    setList,
} from '../redux/actions';

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
    let showTitle = route.params.title;
    if (showTitle.length > 15) showTitle = showTitle.slice(0, 15) + '...';
    navigation.setOptions({
      title: showTitle,
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
                navigation.navigate('ShabadScreen');
              },
            },
            {
              name: 'shuffle-outline',
              action: () => {
                const items = Object.keys(route.params.data);
                const item = items[Math.floor(Math.random() * items.length)];
                if (route.params.data[item].currentAng) {
                  navigation.navigate('OpenPdf', {
                    pdfTitle: item,
                    folderTitle: route.params.title,
                  });
                } else {
                  navigation.push('Home', {
                    data: route.params.data[item],
                    title: item,
                  });
                }
                //const theList = state.allPdfs[item];
                //console.log(theList);
                //navigation.navigate('BanisList', {
                //list: theList,
                //folderTitle: item, //name of the bar clicked on
                //});
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

  return (
    <View style={styles.container}>
      <View style={styles.scroll}>
        <FlatList
          keyExtractor={item => item} //name of each item like 'Bai Vaara'
          data={Object.keys(route.params.data)}
          renderItem={({item}) => {
            console.log(item);
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
                text={item}
                right={
                  !route.params.data[item].currentAng ? (
                    <Icon
                      name="arrow-forward-outline"
                      type="ionicon"
                      color={state.darkMode ? 'white' : 'black'}
                    />
                  ) : (
                    <CheckBox
                      checked={state.allPdfs[route.params.title][item].checked}
                      checkedColor="#0F0"
                      checkedTitle="ਸੰਪੂਰਨ"
                      containerStyle={{
                        borderRadius: 10,
                        //padding: 10,
                        backgroundColor: 'black',
                      }}
                      onPress={() => {
                        dispatch(setCheckBox(item, route.params.title));
                      }}
                      //size={20}
                      textStyle={{
                        fontSize: 10,
                        height: 20,
                        color: 'white',
                      }}
                      title="Not Done"
                      titleProps={{}}
                      uncheckedColor="#F00"
                    />
                  )
                }
                onClick={() => {
                  if (route.params.data[item].currentAng) {
                    navigation.navigate('OpenPdf', {
                      pdfTitle: item,
                      folderTitle: route.params.title,
                    });
                  } else {
                    navigation.push('Home', {
                      data: route.params.data[item],
                      title: item,
                    });
                  }
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
