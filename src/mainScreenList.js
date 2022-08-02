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
import {AddFileModal} from '../assets/components/addFilesModal.js';
import {getItemFromFullPath} from '../assets/helper_funcs.js';

import {setCheckBox} from '../redux/actions';

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
      headerTintColor: state.darkMode ? 'white' : 'black',
      headerTitleStyle: {
        color: state.darkMode ? 'white' : 'black',
      },
      headerRight: () => (
        <RightOfHeader
          state={state}
          icons={[
            {
              name: 'open-outline',
              action: () => navigation.navigate('ShabadScreen'),
            },
            {
              name: 'shuffle-outline',
              action: () => {
                const items = Object.keys(route.params.dataObj);
                if (items.length === 0) return;

                const item = items[Math.floor(Math.random() * items.length)];
                if (route.params.dataObj[item].currentAng) {
                  navigation.navigate('OpenPdf', {
                    pdfTitle: item,
                    fullPath: [...route.params.fullPath],
                  });
                } else {
                  let theDataObj = route.params.dataObj[item];
                  navigation.push('Home', {
                    dataObj: theDataObj,
                    title: item,
                    fullPath: [...route.params.fullPath, item],
                  });
                }
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
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
      height: '100%',
    },
  });

  if (route.params.addedPdfs) {
    return (
      <AddedPDFsScreen
        state={state}
        dispatch={dispatch}
        params={route.params}
        navigation={navigation}
        container={styles.container}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ListDisplay
        state={state}
        dispatch={dispatch}
        params={route.params}
        navigation={navigation}
      />
    </View>
  );
}

function ListDisplay({state, dispatch, params, navigation}) {
  const dataObj = params.dataObj;
  const fullPath = params.fullPath;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
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
          data={Object.keys(dataObj)}
          renderItem={({item}) => {
            const isFolder = !dataObj[item].currentAng; //currentAng will never be 0
            return (
              <BarOption
                state={state}
                left={
                  <Icon
                    name={isFolder ? 'folder-outline' : 'document-outline'}
                    type="ionicon"
                    color={state.darkMode ? 'white' : 'black'}
                  />
                }
                text={item}
                right={
                  isFolder ? (
                    <Icon
                      name="arrow-forward-outline"
                      type="ionicon"
                      color={state.darkMode ? 'white' : 'black'}
                    />
                  ) : (
                    <CheckBox
                      checked={
                        getItemFromFullPath(state.allPdfs, fullPath)[item]
                          .checked
                      }
                      checkedColor="#0F0"
                      checkedTitle="ਸੰਪੂਰਨ"
                      containerStyle={{
                        borderRadius: 10,
                        //padding: 10,
                        backgroundColor: 'black',
                      }}
                      onPress={() => {
                        dispatch(setCheckBox(item, fullPath));
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
                  if (isFolder) {
                    let theDataObj = getItemFromFullPath(
                      state.allPdfs,
                      fullPath,
                    )[item];
                    const addedPdfs = item === 'Added PDFs' || params.addedPdfs;
                    navigation.push('Home', {
                      dataObj: theDataObj,
                      title: item,
                      fullPath: [...fullPath, item],
                      addedPdfs,
                    });
                  } else {
                    navigation.navigate('OpenPdf', {
                      pdfTitle: item,
                      fullPath: [...fullPath],
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

function AddedPDFsScreen({state, dispatch, params, navigation, container}) {
  const [visible, setVisibility] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      ...container,
    },
    scroll: {
      height: '85%',
    },
    bottomRow:{
      flexDirection:'row',
      justifyContent:'space-evenly'
    }
    
  });

  return (
    <View style={styles.container}>
      <View style={styles.scroll}>
        <ListDisplay
          state={state}
          dispatch={dispatch}
          params={params}
          navigation={navigation}
        />
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          onPress={() => {
            setVisibility(true);
          }}>
          <Icon
            name={'add-outline'}
            type="ionicon"
            size={50}
            color={state.darkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setVisibility(true);
          }}>
          <Icon
            name={'trash-outline'}
            type="ionicon"
            size={50}
            color={state.darkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <AddFileModal
        state={state}
        dispatch={dispatch}
        visible={visible}
        setVisibility={setVisibility}
        fullPath={params.fullPath}
        navigation={navigation}
      />
    </View>
  );
}

export default HomeScreen;
