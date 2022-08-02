import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import { setTheState } from '../redux/actions';
import { initialState } from '../redux/reducers';
import { allColors } from '../assets/styleForEachOption';
import { BarOption } from '../assets/components/baroption';
import { RightOfHeader } from '../assets/components/rightOfHeader';
import { AddFileModal } from '../assets/components/addFilesModal.js';
import {getItemFromFullPath} from '../assets/common_funcs.js'


import {
  setCheckBox,
  deleteAddedItem,
  addNdeletePdf,
  setList,
} from '../redux/actions';

function HomeScreen({ navigation, route }) {
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
              name: route.params.title == "Added PDFs" ? "add-outline" : 'open-outline',
              action: () => {
                if (route.params.title !== "Added PDFs") {
                  navigation.navigate('ShabadScreen');
                  return;
                }
                console.log("Added Pdf page")
              },
            },
            {
              name: 'shuffle-outline',
              action: () => {
                const items = Object.keys(route.params.dataObj);
                if (items.length === 0) return

                const item = items[Math.floor(Math.random() * items.length)];
                if (route.params.dataObj[item].currentAng) {
                  navigation.navigate('OpenPdf', {
                    pdfTitle: item,
                    folderTitle: route.params.title,
                  });
                } else {
                  navigation.push('Home', {
                    data: route.params.dataObj[item],
                    title: item,
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
          data={Object.keys(route.params.dataObj)}
          renderItem={({ item }) => {
            const isFolder = !route.params.dataObj[item].currentAng; //currentAng will never be 0
            // console.log(item);
            return (
              <BarOption
                state={state}
                left={
                  <Icon
                    name={isFolder ? "folder-outline" : "document-outline"}
                    type="ionicon"
                    color={state.darkMode ? 'white' : 'black'}
                  />
                }
                text={item}
                right={
                  isFolder || route.params.title == "Unfinished Business" ? (
                    <Icon
                      name="arrow-forward-outline"
                      type="ionicon"
                      color={state.darkMode ? 'white' : 'black'}
                    />
                  ) : (
                    <CheckBox
                      checked={getItemFromFullPath(state.allPdfs, route.params.fullPath)[item].checked}
                      checkedColor="#0F0"
                      checkedTitle="ਸੰਪੂਰਨ"
                      containerStyle={{
                        borderRadius: 10,
                        //padding: 10,
                        backgroundColor: 'black',
                      }}
                      onPress={() => {
                        dispatch(setCheckBox(item, route.params.fullPath));
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
                    let theDataObj = route.params.dataObj[item]
                    // console.log(theDataObj)
                    if (item === "Unfinished Business") {
                      theDataObj = getPdfsFromDiffFolders(state.allPdfs);
                    }
                    navigation.push('Home', {
                      dataObj: theDataObj,
                      title: item,
                      fullPath: [...route.params.fullPath, item],
                    });
                  } else {
                    navigation.navigate('OpenPdf', {
                      pdfTitle: item,
                      fullPath:[...route.params.fullPath],
                    });
                  }
                }}
              />
            );
          }}
        />
        {/* <AddFileModal
          state={state}
          dispatch={dispatch}
          visible={true}
          setVisibility={true}
          folderTitle={true}
          onlyFiles={true}
        /> */}
      </View>
    </View>
  );
}

// function AddedPDFsScreen({})


function getPdfsFromDiffFolders(pdfObj, pdfsLstForAllPdfs = {}) {
  //pdfs for unfinished business
  for (const item of Object.keys(pdfObj)) {
    if (!pdfObj[item].currentAng) {
      //means if isfolder
      getPdfsFromDiffFolders(
        pdfObj[item],
        pdfsLstForAllPdfs,
      );
      continue;
    }
    if (pdfObj[item].currentAng > 1 && !pdfObj[item].checked)
      pdfsLstForAllPdfs[item] = pdfObj[item];
  }
  console.log(pdfsLstForAllPdfs, "UOOUU")
  return pdfsLstForAllPdfs;
}
export default HomeScreen;

