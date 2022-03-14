import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import {RightOfHeader} from '../assets/components/rightOfHeader';

import Pdf from 'react-native-pdf';
import TeekaPDF from '../assets/components/teekaPdf';
import {useSelector, useDispatch} from 'react-redux';
import {setAngNum} from '../redux/actions';
import {allColors} from '../assets/styleForEachOption';

export default function OpenPdf({navigation, route}) {
  const [totalAngs, setTotalAngs] = React.useState(0);
  const [currrentAng, setCurrentAng] = React.useState(1);
  const [showHeader, setShowHeader] = React.useState(true);

  const currentAngRef = React.useRef(1); //only for addListner

  const state = useSelector(theState => theState.theReducer);
  const dispatch = useDispatch();

  const {pdfTitle} = route.params;

  React.useEffect(() => {
    //pick up where you left off from last time
    //this.pdf.setPage(state.allPdfs[pdfTitle].currentAng);
  }, [totalAngs]);

  const headerStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    title: {
      flex: 1,
      margin: 10,
      borderRadius: 5,
      height: '75%',
      backgroundColor: '#077b8a',
      justifyContent: 'center',
      textAlign: 'center',
    },
    pagesBox: {
      flex: 1.5,
      margin: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      // justifyContent: 'space-evenly',
      fontSize: 20,
      flexDirection: 'row',
      backgroundColor: '#077b8a',
    },
    setAngNumBox: {
      borderRadius: 5,
      height: '95%',
      fontSize: 20,
      backgroundColor: '#a2d5c6',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    boxText: {
      fontSize: 25,
    },
    headerBtnsCont: {
      flex: 1,
      flexDirection: 'row',
    },
    headerBtns: {
      flex: 1,
      paddingTop: 20,
    },
  });

  React.useEffect(() => {
    if (pdfTitle === 'Fareedkot Teeka.pdf') return;
    let showTitle = pdfTitle;
    if (showTitle.length > 15) showTitle = showTitle.slice(0, 15) + '...';

    navigation.setOptions({
      headerShown: showHeader,
      headerTintColor: state.darkMode ? 'white' : 'black',
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerTitle: () => (
        <View style={headerStyles.container}>
          <Text style={headerStyles.title}>{showTitle}</Text>
          <View style={headerStyles.pagesBox}>
            <TextInput
              keyboardType="numeric"
              value={currrentAng.toString()}
              style={headerStyles.setAngNumBox}
              placeholder="ex: 5"
              onChangeText={text => {
                if (text.length === 0) {
                  setCurrentAng('');
                } else if (text.length < 5) {
                  setCurrentAng(parseInt(text));
                }
              }}
              onSubmitEditing={e => {
                const asInt = currrentAng;
                if (asInt) {
                  //this.pdf.setPage(asInt);
                  if (asInt > totalAngs) {
                    setCurrentAng(totalAngs);
                  }
                }
              }}
            />
            <Text style={headerStyles.boxText}>/{totalAngs}</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <RightOfHeader
          state={state}
          icons={[
            {
              name: 'shuffle-outline',
              action: () => {
                const randAng = Math.floor(Math.random() * totalAngs) + 1;
                //this.pdf.setPage(randAng);
                setCurrentAng(randAng);
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

  React.useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      dispatch(setAngNum(pdfTitle, currentAngRef.current));
    });
  }, [navigation]);

  const fileName = pdfTitle.split(' ').join(''); //replaces " " with ""
  const sourceFileName = {uri: state.allPdfs[pdfTitle].uri};

  if (fileName === 'FareedkotTeeka.pdf') {
    return <TeekaPDF navigation={navigation} />;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
    },
    pdf: {
      width: '100%',
      height: '99%',
      borderRadius: 15,
    },
  });
  return (
    <View style={styles.container}>
      <Pdf
        ref={pdf => {
          //this.pdf = pdf;
        }}
        activityIndicator={<ActivityIndicator size="large" color="blue" />}
        source={sourceFileName}
        onLoadComplete={(numberOfPages, filePath) => {
          setTotalAngs(numberOfPages);
        }}
        onPageChanged={(page, numberOfPages) => {
          if (showHeader && state.hideHeaderOnScroll && page > currrentAng) {
            setShowHeader(false);
          }
          setCurrentAng(page);
          currentAngRef.current = page;
          //console.log(currentAngRef)
        }}
        onPageSingleTap={() => {
          setShowHeader(!showHeader);
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
        style={styles.pdf}
      />
    </View>
  );
}
