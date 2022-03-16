import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
    TextInput,
    Alert,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
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
    const [showHeader, setShowHeader] = React.useState(true);

    const currentAngRef = React.useRef(1); //only for addListner

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
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    React.useEffect(() => {
        //pick up where you left off from last time
        //this.pdf.setPage(state.allPdfs[pdfTitle].currentAng);
        navigation.addListener('beforeRemove', () => {
            //console.log('ran',currentAngRef,currrentAng);
            dispatch(setAngNum(pdfTitle, currentAngRef.current));
        });
    }, [totalAngs, navigation]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
            <Header1
                title={pdfTitle}
                currentAng={currentAng}
                totalAngs={totalAngs}
                state={state}
                navigation={navigation}
            />
            {/*

            <Pdf
                ref={pdf => {
                    //this.pdf = pdf;
                }}
                source={sourceFileName}
                activityIndicator={
                    <ActivityIndicator size="large" color="blue" />
                }
                onLoadComplete={(numberOfPages, filePath) => {
                    setTotalAngs(numberOfPages);
                }}
                onPageChanged={(page, numberOfPages) => {
                    setCurrentAng(page);
                    //navigation.setOptions({title:page})
                    //navigation.goBack();
                    if (
                        showHeader &&
                        state.hideHeaderOnScroll &&
                        page > currentAng
                    ) {
                        setShowHeader(false);
                    }
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
*/}
        </View>
    );
}

function Header1({title, currentAng, totalAngs, state, navigation}) {
    const styles = StyleSheet.create({
        container: {
            //flex:1,
            alignItems: 'center',
            backgroundColor: allColors[state.darkMode].headerColor,
            width: '100%',
            height: '10%',
            //top: 30,
            //position:'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            //padding:15,
        },
        angInfo: {
            alignItems: 'center',
            justifyContent: 'center',
            //fontSize: 20,
            borderRadius: 10,
            //padding:5,
            backgroundColor: '#077b8a',
        },
        title: {
            backgroundColor: 'red',
            textAlign: 'center',
        },
        angNumInfo: {
            //padding:10,
            //margin:5,
            backgroundColor: '#078b8a',
            flexDirection: 'row',
            alignItems: 'center',
        },
        setAngNumBox: {
            //top:"2%",
            borderRadius: 5,
            backgroundColor: '#a2d5c6',
            textAlign: 'right',
            fontSize: 25,
        },
        totalAngsInfo: {
            fontSize: 25,
        },
        headerBtns: {},

        headerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#397af8',
            marginBottom: 20,
            width: '100%',
            paddingVertical: 15,
        },
        heading: {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
        },
        headerRight: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 5,
        },
        subheaderText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });
    let showTitle = title;
    //if (showTitle.length > 10) showTitle = showTitle.slice(0, 10) + '...';
    const iconsSize = 25;
    return (
        <Header
            leftComponent={
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
            }
            rightComponent={
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.headerBtns}
                        onPress={() => {}}>
                        <Icon
                            size={iconsSize}
                            name="shuffle-outline"
                            type="ionicon"
                            color={state.darkMode ? 'white' : 'black'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerBtns}
                        onPress={() => {
                            navigation.navigate('Settings Page');
                        }}>
                        <Icon
                            size={iconsSize}
                            name="settings-outline"
                            type="ionicon"
                            color={state.darkMode ? 'white' : 'black'}
                        />
                    </TouchableOpacity>
                </View>
            }
            centerComponent={{text: 'Header', style: styles.heading}}
        />
    );
    return (
        <View style={styles.container}>
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
            <View style={styles.angInfo}>
                <Text style={styles.title}>{showTitle}</Text>
                <View style={styles.angNumInfo}>
                    <TextInput
                        style={styles.setAngNumBox}
                        keyboardType="numeric"
                        //value={'1456'}
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
            </View>
            <TouchableOpacity style={styles.headerBtns} onPress={() => {}}>
                <Icon
                    size={iconsSize}
                    name="shuffle-outline"
                    type="ionicon"
                    color={state.darkMode ? 'white' : 'black'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.headerBtns}
                onPress={() => {
                    navigation.navigate('Settings Page');
                }}>
                <Icon
                    size={iconsSize}
                    name="settings-outline"
                    type="ionicon"
                    color={state.darkMode ? 'white' : 'black'}
                />
            </TouchableOpacity>
        </View>
    );
}
