import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {RightOfHeader} from '../assets/components/rightOfHeader';

import Pdf from 'react-native-pdf';
import TeekaPDF from '../assets/components/teekaPdf';
import {useSelector, useDispatch} from 'react-redux';
import {setAngNum} from '../redux/actions';
import {allColors} from '../assets/styleForEachOption';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function OpenPdf({navigation, route}) {
  const [totalAngs, setTotalAngs] = React.useState(0);
  const [currentAng, setCurrentAng] = React.useState(1);
  const [headerShown, setHeaderShown] = React.useState(true);

  const currentAngRef = React.useRef(1); //only for addListner
  const pdfRef = React.useRef(null);

  const state = useSelector(theState => theState.theReducer);
  const dispatch = useDispatch();

  const {pdfTitle} = route.params;
  const fileName = pdfTitle.split(' ').join(''); //replaces " " with ""
  const sourceFileName = {uri: state.allPdfs[pdfTitle].uri};
  //const sourceFileName = { uri: 'http://kathadata.host/pdfs/BaiVarra/1)SriRaagKiVaarMahala4.pdf', cache: true };

  if (fileName === 'FareedkotTeeka.pdf') {
    return <TeekaPDF navigation={navigation} />;
  }
  const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  console.log(keyboardStatus)

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  React.useEffect(() => {
    //pick up where you left off from last time
    pdfRef.current.setPage(state.allPdfs[pdfTitle].currentAng);
    navigation.addListener('beforeRemove', () => {
      dispatch(setAngNum(pdfTitle, currentAngRef.current));
    });
  }, [totalAngs, navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      //alignItems: 'center',
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
    },
    pdf: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      //position: 'absolute'
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
        onPageChanged={(page, numberOfPages) => {
          setCurrentAng(page);
          if (headerShown && state.hideHeaderOnScroll && page > currentAng) {
            setHeaderShown(false);
          } else if (
            !headerShown &&
            state.showHeaderOnScroll &&
            page < currentAng
          ) {
            setHeaderShown(true);
          }
          currentAngRef.current = page;
          //console.log(currentAngRef)
        }}
        onPageSingleTap={() => {
          setHeaderShown(!headerShown);
        }}
        onError={error => {
          Alert.alert(
            'PDF ERROR',
            String(error),
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
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
      />
      <Header
        //header on the bottom so it can be drawn on top of the pdf.
        title={pdfTitle}
        currentAng={currentAng}
        totalAngs={totalAngs}
        state={state}
        navigation={navigation}
        hidden={!headerShown}
      />
    </View>
  );
}

function Header({title, currentAng, totalAngs, state, navigation, hidden}) {
  if (hidden) return null;

  const [textInput, setInput] = React.useState('');
  const angNumFontSize = 25;
  const inputRef = React.useRef(null);
  //if (inputRef.current!==null) inputRef.current.focus();
  const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: allColors[state.darkMode].headerColor,
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 15,
      height: '9%',
      //top: 30,
      //marginBottom: 20,
      //paddingVertical: 15,
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

    headerBtns: {},
    headerRight: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 5,
    },
  });
  let showTitle = title;
  if (showTitle.length > 10) showTitle = showTitle.slice(0, 10) + '...';
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
          ref={inputRef}
          style={styles.setAngNumBox}
          //keyboardType="numeric"
          //value={'14560'}
          value={textInput}
          onChangeText={setInput}
          //value={currentAng.toString()}
          placeholder={currentAng.toString()}
          //onSubmitEditing={e => {
          //const asInt = currentAng;
          //if (asInt) {
          //// this.pdf.setPage(asInt);
          //if (asInt > totalAngs) {
          ////setCurrentAng(totalAngs);
          //}
          //}
          //}}
          //onChangeText={text => {
          //console.log(text)
          //if (text.length === 0) {
          ////setCurrentAng('');
          //} else if (text.length < 5) {
          ////setCurrentAng(parseInt(text));
          //}
          //}}
        />
        <Text style={styles.totalAngsInfo}>/{totalAngs}</Text>
      </View>
      <View>
        <RightOfHeader
          state={state}
          icons={[
            {
              name: 'shuffle-outline',
              action: () => {
                inputRef.current.focus();
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
