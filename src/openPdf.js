import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
  PermissionsAndroid
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
//import {RNFS} from 'react-native-fs';
var RNFS = require('react-native-fs');
import {Icon} from 'react-native-elements';
import {RightOfHeader} from '../assets/components/rightOfHeader';

import Pdf from 'react-native-pdf';
import TeekaPDF from '../assets/components/teekaPdf';
import {useSelector, useDispatch} from 'react-redux';
import {setAngNum, addUriPath, removeUriPath} from '../redux/actions';
import {allColors} from '../assets/styleForEachOption';
import {TouchableOpacity} from 'react-native-gesture-handler';

const alertMsg = msg => {
  return Alert.alert('Oops!!', msg, [
    {
      text: 'OK',
      onPress: () => {},
    },
  ]);
};

export default function OpenPdf({navigation, route}) {
  const [totalAngs, setTotalAngs] = React.useState(0);
  const [currentAng, setCurrentAng] = React.useState(1);
  const [headerShown, setHeaderShown] = React.useState(true);

  const currentAngRef = React.useRef(1); //only for addListner
  const pdfRef = React.useRef(null);

  const state = useSelector(theState => theState.theReducer);
  const dispatch = useDispatch();

  const {pdfTitle} = route.params;
  const {folderTitle} = route.params;
  const sourceFileName = {
    uri: state.allPdfs[folderTitle][pdfTitle].uris[0],
    cache: true,
  };
  //console.log(sourceFileName,state.allPdfs[folderTitle][pdfTitle]);
  if (pdfTitle === 'Fareedkot Teeka') {
    return <TeekaPDF navigation={navigation} uri={sourceFileName.uri} />;
  }
  React.useEffect(() => {
    pdfRef.current.setPage(state.allPdfs[folderTitle][pdfTitle].currentAng);
    navigation.addListener('beforeRemove', () => {
      dispatch(setAngNum(folderTitle, pdfTitle, currentAngRef.current));
    });
  }, [totalAngs, navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
    },
    pdf: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
  });

  return (
    <View style={styles.container}>
      <Pdf
        style={styles.pdf}
        ref={pdfRef}
        source={sourceFileName}
        activityIndicator={<ActivityIndicator size="large" color="blue" />}
        onLoadComplete={(numberOfPages, filePath) => {
          setTotalAngs(numberOfPages);
        }}
        onPageChanged={page => {
          if (
            headerShown &&
            state.hideHeaderOnScroll &&
            page == currentAng + 1
          ) {
            setHeaderShown(false);
          } else if (
            !headerShown &&
            state.showHeaderOnScroll &&
            page + 1 == currentAng
          ) {
            setHeaderShown(true);
          }
          setCurrentAng(page);
          currentAngRef.current = page;
        }}
        onPageSingleTap={() => {
          setHeaderShown(!headerShown);
        }}
        onError={error => {
          const strError = String(error);
          if (strError === 'Error: canceled') return;
          if (
            strError ===
              'Error: open failed: ENOENT (No such file or directory)' ||
            strError === 'Error: no pdf source!'
          ) {
            dispatch(removeUriPath(folderTitle, pdfTitle));
            return;
          }
          Alert.alert(
            'PDF ERROR',
            strError,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          );
          dispatch(removeUriPath(folderTitle, pdfTitle)); //remove path to downloaded pdf
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
      />
      <Header
        //header on the bottom so it can be drawn on top of the pdf.
        folder={folderTitle}
        title={pdfTitle}
        currentAng={currentAng}
        totalAngs={totalAngs}
        state={state}
        dispatch={dispatch}
        navigation={navigation}
        hidden={!headerShown}
        pdfRef={pdfRef}
        link={
          state.allPdfs[folderTitle][pdfTitle].uris[
            state.allPdfs[folderTitle][pdfTitle].uris.length - 1
          ]
        }
      />
    </View>
  );
}

function Header({
  dispatch,
  folder,
  title,
  currentAng,
  totalAngs,
  state,
  navigation,
  hidden,
  pdfRef,
  link,
}) {
  if (hidden) return null;

  const [textInput, setInput] = React.useState('');
  const angNumFontSize = 25;
  const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: allColors[state.darkMode].headerColor,
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 15,
      //height: '9%',
      position: 'absolute',
    },
    title: {
      backgroundColor: '#077b8a',
      padding: 5,
      borderRadius: 5,
      textAlign: 'center',
      color: state.darkMode ? 'white' : 'black',
    },
    angNumInfo: {
      padding: 1,
      margin: 5,
      borderRadius: 5,
      backgroundColor: '#078b8a',
      flexDirection: 'row',
      alignItems: 'center',
    },
    setAngNumBox: {
      margin: 3,
      padding: 5,
      //top:"2%",
      borderRadius: 5,
      backgroundColor: '#a2d5c6',
      textAlign: 'right',
      fontSize: angNumFontSize,
    },
    totalAngsInfo: {
      fontSize: angNumFontSize,
    },
  });
  let showTitle = title;
  if (showTitle.length > 10) showTitle = showTitle.slice(0, 7) + '..';
  const iconsSize = 25;
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerBtns}>
        <Icon
          name="arrow-back-outline"
          size={iconsSize}
          type="ionicon"
          color={state.darkMode ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log(title);
        }}>
        <Text style={styles.title}>{showTitle}</Text>
      </TouchableOpacity>
      <View style={styles.angNumInfo}>
        <TextInput
          style={styles.setAngNumBox}
          keyboardType="numeric"
          placeholder={currentAng.toString()}
          value={textInput}
          onChangeText={txt => setInput(txt)}
          onSubmitEditing={e => {
            const num = Number.parseInt(e.nativeEvent.text, 10);
            setInput('');
            if (!num) return;
            pdfRef.current.setPage(num);
          }}
        />
        <Text style={styles.totalAngsInfo}>/{totalAngs}</Text>
      </View>
      <View>
        <RightOfHeader
          state={state}
          icons={[
            {
              name: 'cloud-download-outline',
              action: () => {
                function mkdir(path) {
                  RNFS.exists(path).then(dirExists => {
                    if (dirExists) {
                      console.log(path + ' exists');
                    } else {
                      RNFS.mkdir(path);
                    }
                  });
                }
                const requestFilePermission = async () => {
                  try {
                    const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                      {
                        title: 'Cool Photo App Camera Permission',
                        message:
                          'Cool Photo App needs access to your camera ' +
                          'so you can take awesome pictures.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                      },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                      return true;
                    } else {
                      alertMsg('Camera permission denied');
                    }
                  } catch (err) {
                    console.warn(err);
                    alertMsg(err)
                  }
                  return false;
                };
                if (!requestFilePermission()) {
                  alertMsg("Can't read files. Please give permission")
                }
                const {config, fs} = RNFetchBlob;
                const {DownloadDir} = fs.dirs; // You can check the available directories in the wiki.

                let DirectoryPath = DownloadDir + '/' + 'SanthiyaPothi/';
                mkdir(DirectoryPath);
                DirectoryPath += folder;
                mkdir(DirectoryPath);

                const pathToFile = `${DirectoryPath}/${title}.pdf`;
                RNFS.exists(pathToFile).then(fileExists => {
                  if (fileExists) {
                    console.log('File already exists.');
                    alertMsg('File already exists.');
                  } else {
                    const options = {
                      fileCache: true,
                      addAndroidDownloads: {
                        useDownloadManager: true, // true will use native manager and be shown on notification bar.
                        notification: true,
                        path: pathToFile,
                        description: 'Downloading.',
                      },
                    };
                    config(options)
                      .fetch('GET', link)
                      .then(res => {
                        console.log(res);
                        alertMsg("Downloaded at "+res.data);
                        dispatch(addUriPath(folder, title, res.data));
                        //console.log('do some magic in here');
                      })
                      .catch(err => {
                        console.log(err);
                        alertMsg(String(err))
                      });
                  }
                });
              },
            },
            {
              name: 'shuffle-outline',
              action: () => {
                const randAng = Math.floor(Math.random() * totalAngs) + 1;
                pdfRef.current.setPage(randAng);
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
      </View>
    </View>
  );
}
