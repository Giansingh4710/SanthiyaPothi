import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

import {HeaderBackButton} from '@react-navigation/stack';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

import Pdf from 'react-native-pdf';
import TeekaPDF from '../assets/otherScreens/teekaPdf';
import {useSelector, useDispatch} from 'react-redux';
import {setAngNum, setCheckBox} from '../redux/actions';
import {allColors} from '../assets/styleForEachOption';

export default function OpenPdf({navigation, route}) {
  const [totalAngs, setTotalAngs] = React.useState(0);
  const [currrentAng, setCurrentAng] = React.useState(1);
  const [showHeader, setShowHeader] = React.useState(true);
  const [showBackDropDownMenu, setBackDropDownMenu] = React.useState(false);

  const goBackWithoutSaving=React.useRef(false);

  const currentAngRef = React.useRef(1); //only for addListner
  const totalAngRef = React.useRef(1); //only for addListner

  const state = useSelector(theState => theState.theReducer);
  const dispatch = useDispatch();

  const {pdfTitle} = route.params;

  React.useEffect(() => {
    this.pdf.setPage(state.allPdfs[pdfTitle].currentAng);
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

    //<MenuTrigger triggerOnLongPress style={{backgroundColor: 'red'}}>
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerLeft: () => (
        <MenuProvider>
          <TouchableOpacity
            style={{
              width: 80,
              //backgroundColor:'blue'
            }}
            onLongPress={() => {
              setBackDropDownMenu(true);
            }}
            onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              settings-outlinetype="ionicon"
              style={{
                margin: 15,
                left: -10,
                //width: 60,
                //backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </TouchableOpacity>
          <Menu opened={showBackDropDownMenu}>
            <MenuTrigger></MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => {
                  navigation.goBack();
                }}
                text="Save"
              />
              <MenuOption
                onSelect={() => {
                  goBackWithoutSaving.current=true
                  navigation.goBack();
                }}
                text="Don't Save"
              />
              <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled={true}
                text="Disabled"
              />
            </MenuOptions>
          </Menu>
        </MenuProvider>
      ),
      headerTitle: () => (
        <View style={headerStyles.container}>
          <Text style={headerStyles.title}>{showTitle}</Text>
          <View style={headerStyles.pagesBox}>
            <TextInput
              keyboardType="numeric"
              value={currrentAng.toString()}
              style={headerStyles.setAngNumBox}
              placeholder="ex: 5"
              onSubmitEditing={e => {
                const asInt = currrentAng;
                if (asInt) {
                  this.pdf.setPage(asInt);
                  if (asInt > totalAngs) {
                    setCurrentAng(totalAngs);
                  }
                }
              }}
              onChangeText={text => {
                if (text.length === 0) {
                  setCurrentAng('');
                } else if (text.length < 5) {
                  setCurrentAng(parseInt(text));
                }
              }}
            />
            <Text style={headerStyles.boxText}>/{totalAngs}</Text>
          </View>
          <View style={headerStyles.headerBtnsCont}>
            <TouchableOpacity
              style={headerStyles.headerBtns}
              onPress={() => {
                const randAng = Math.floor(Math.random() * totalAngs) + 1;
                this.pdf.setPage(randAng);
                setCurrentAng(randAng);
              }}>
              <Icon name="shuffle-outline" type="ionicon"></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={headerStyles.headerBtns}
              onPress={() => {
                navigation.navigate('Settings Page');
              }}>
              <Icon name="settings-outline" type="ionicon"></Icon>
            </TouchableOpacity>
          </View>
        </View>
      ),
      headerShown: showHeader,
    });
  });

  React.useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      if (goBackWithoutSaving.current) {
        console.log('Position of ang not saved!');
      } else {
        dispatch(setAngNum(pdfTitle, currentAngRef.current));
        if (currentAngRef.current === totalAngRef.current) {
          if (state.allPdfs[pdfTitle].checked === false) {
            dispatch(setCheckBox(pdfTitle));
          }
        }
      }
    });
  }, [navigation]);

  const fileName = pdfTitle.split(' ').join(''); //replaces " " with ""
  const sourceFileName = {uri: state.allPdfs[pdfTitle].uri};

  if (fileName === 'FareedkotTeeka.pdf') {
    return <TeekaPDF navigation={navigation} />;
  }

  const theColors = allColors[state.darkMode].openPdf;
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
          this.pdf = pdf;
        }}
        activityIndicator={<ActivityIndicator size="large" color="blue" />}
        source={sourceFileName}
        onLoadComplete={(numberOfPages, filePath) => {
          setTotalAngs(numberOfPages);
          totalAngRef.current = numberOfPages;
        }}
        onPageChanged={(page, numberOfPages) => {
          if (state.hideHeaderOnScroll && page > currrentAng) {
            setShowHeader(false);
          }
          setCurrentAng(page);
          currentAngRef.current = page;
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
