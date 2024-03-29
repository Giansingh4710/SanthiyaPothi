import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
// var RNFS = require('react-native-fs');
import {Icon} from 'react-native-elements';
import {RightOfHeader} from '../assets/components/rightOfHeader';

import Pdf from 'react-native-pdf';
import TeekaPDF from '../assets/components/teekaPdf';
import {useSelector, useDispatch} from 'react-redux';
import {setAngNum} from '../redux/actions';
import {allColors} from '../assets/styleForEachOption';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getItemFromFullPath} from '../assets/helper_funcs.js';

import {PdfInfoModal} from '../assets/components/add_or_del_item_Modal.js'

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
  const [showPdfModal, setPdfModal] = React.useState(false);

  const currentAngRef = React.useRef(1); //only for addListner
  const pdfRef = React.useRef(null);

  const state = useSelector(theState => theState.theReducer);
  const dispatch = useDispatch();

  const {pdfTitle} = route.params;
  const {fullPath} = route.params;
  const fileObj = getItemFromFullPath(state.allPdfs, [...fullPath, pdfTitle]);

  const sourceFileName = {
    uri: fileObj.uri,
    cache: true,
  };
  if (pdfTitle === 'Fareedkot Teeka') {
    return <TeekaPDF navigation={navigation} uri={sourceFileName.uri} />;
  }

  React.useEffect(() => {
    pdfRef.current.setPage(fileObj.currentAng);
    navigation.addListener('beforeRemove', () => {
      dispatch(setAngNum(fullPath, pdfTitle, currentAngRef.current));
    });
  }, [totalAngs, navigation]);

  React.useEffect(() => {
    if(showPdfModal)setHeaderShown(false)
  })

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
          if(strError==="Error: canceled")return 
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
          console.log(error);
          return;
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
        dispatch={dispatch}
        navigation={navigation}
        hidden={!headerShown}
        pdfRef={pdfRef}
        setPdfModal={setPdfModal}
      />
      <PdfInfoModal
        visible={showPdfModal}
        setVisibility={setPdfModal}
        state={state}
        pdfInfo={{...fileObj,pdfTitle:pdfTitle}}
      />
    </View>
  );
}

function Header({
  title,
  currentAng,
  totalAngs,
  state,
  navigation,
  hidden,
  pdfRef,
  setPdfModal,
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
      <TouchableOpacity onPress={() => setPdfModal(true)}>
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

