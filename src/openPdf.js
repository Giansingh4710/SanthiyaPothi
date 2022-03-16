import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
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
  React.useEffect(() => {
    pdfRef.current.setPage(state.allPdfs[pdfTitle].currentAng);
    navigation.addListener('beforeRemove', () => {
      dispatch(setAngNum(pdfTitle, currentAngRef.current));
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
        onPageChanged={(page, numberOfPages) => {
          console.log(page, currentAng);
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
        pdfRef={pdfRef}
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
