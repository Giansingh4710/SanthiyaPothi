import React from 'react';
import {
    FlatList,
    Text,
    StyleSheet,
    View,
    Button,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
    Modal,
    useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {allColors} from '../../assets/styleForEachOption';
import {setFontSize, addToShabadHistory,deleteShabadFromHistory} from '../../redux/actions';
import {RightOfHeader} from '../../assets/components/rightOfHeader';
import {ALLSHABADS} from '../../assets/allShabads.js';

export default function ShabadScreen({navigation}) {
    const dispatch = useDispatch();
    let state = useSelector(theState => theState.theReducer);
    const [shabadModalStuff, setShabadModalStuff] = React.useState({
        visible: false,
        shabadId: getRandomShabadId(),
    });

    React.useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: allColors[state.darkMode].headerColor,
            },
            title: 'Random Shabad',
            headerTintColor: state.darkMode ? 'white' : 'black',
            headerTitleStyle: {
                color: state.darkMode ? 'white' : 'black',
            },
            headerRight: () => (
                <RightOfHeader
                    state={state}
                    icons={[
                        {
                            name: 'shuffle-outline',
                            action: () => {},
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
            flex: 1,
        },
        openShabadBtn: {
            backgroundColor: 'blue',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            margin: 10,
        },
    });

    const pages = [
        <ShabadHistoryView
            key={'2'}
            state={state}
            dispatch={dispatch}
            setModal={setShabadModalStuff}
            modalInfo={shabadModalStuff}
        />,
        <ShabadHistoryView
            key={'1'}
            state={state}
            dispatch={dispatch}
            setModal={setShabadModalStuff}
            modalInfo={shabadModalStuff}
        />,
    ];

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.openShabadBtn}
                onPress={() => {
                    const theID = getRandomShabadId();
                    setShabadModalStuff(prev => ({
                        ...prev,
                        visible: true,
                        shabadId: theID,
                    }));
                    dispatch(addToShabadHistory(theID));
                }}>
                <Text>Open Random Shabad</Text>
            </TouchableOpacity>
            <FlatList
                data={pages}
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                renderItem={i => {
                    //i= {"index": 0, "item": <ShabadHistoryView dispatch={[Function anonymous]} state={{"allPdfs": [Object], "darkMode": true, "fontSizeForShabad": 16, "hideHeaderOnScroll": true, "shabadHistory": [Array], "showHeaderOnScroll": true}} />, "separators": {"highlight": [Function highlight], "unhighlight": [Function unhighlight], "updateProps": [Function updateProps]}}
                    return i.item;
                }}
            />
            <ShabadViewModal
                setModal={setShabadModalStuff}
                modalInfo={shabadModalStuff}
                state={state}
                dispatch={dispatch}
            />
        </SafeAreaView>
    );
}

function ShabadViewModal({state, dispatch, setModal, modalInfo}) {
    //const [shabad, setShabad] = React.useState(ALLSHABADS[shabadId]);
    const [fontsz, setfontsz] = React.useState(state.fontSizeForShabad);

    function fontszGood(num) {
        if (num < 10) return 'small'; //too small
        if (num > 24) return 'big'; // too big
        return true;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: allColors[state.darkMode].shabadPage.container,
            borderRadius: 5,
            padding: 10,
            //width: WIDTH,
        },
        headerContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            flexDirection: 'row',
            padding: 10,
        },
        gurbaniScrollView: {
            //backgroundColor: '#888',
            borderColor: state.darkMode ? 'white' : 'black',
            borderWidth: 1,
            height: '90%',
            padding: 10,
            borderRadius: 10,
        },
        shabadText: {
            fontSize: fontsz,
            color: state.darkMode ? 'white' : 'black',
        },
        plusMinusRow: {
            margin: 5,
            flexDirection: 'row',
        },
        newShabadBtn: {
            //height: '9%',
            borderRadius: 5,
            padding: 4,
            backgroundColor: state.darkMode ? '#316B83' : '#87a194',
        },
    });

    //console.log('from modal', modalInfo);
    return (
        <Modal
            visible={modalInfo['visible']}
            transparent
            animationType="slide"
            onRequestClose={() =>
                setModal(prev => {
                    return {...prev, visible: false};
                })
            }>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setModal(prev => {
                                return {...prev, visible: false};
                            });
                        }}
                        style={styles.headerBtns}>
                        <Icon
                            name="arrow-back-outline"
                            size={25}
                            type="ionicon"
                            color={state.darkMode ? 'white' : 'black'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}}
                        style={styles.headerBtns}>
                        <Icon
                            name="bookmark-outline"
                            size={25}
                            type="ionicon"
                            color={state.darkMode ? 'white' : 'black'}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.gurbaniScrollView}>
                    <Text style={styles.shabadText}>
                        {ALLSHABADS[modalInfo.shabadId]}
                    </Text>
                </ScrollView>
                <View style={styles.plusMinusRow}>
                    <Icon
                        name="remove-outline"
                        type="ionicon"
                        onPress={() => {
                            if (fontszGood(fontsz) === 'small') return;
                            setfontsz(prev => prev - 1);
                            dispatch(setFontSize(fontsz));
                        }}
                        size={fontsz + 12}
                        color={state.darkMode ? 'white' : 'black'}
                    />
                    <Icon
                        size={fontsz * 2}
                        color={state.darkMode ? 'white' : 'black'}
                        name="add-outline"
                        type="ionicon"
                        onPress={() => {
                            if (fontszGood(fontsz) === 'big') return;
                            setfontsz(prev => prev + 1);
                            dispatch(setFontSize(fontsz));
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
}

function ShabadHistoryView({state, dispatch, setModal}) {
    const [refreshFlatlist, setRefreshFlatList] = React.useState(false);

    const {width} = useWindowDimensions();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: allColors[state.darkMode].shabadPage.container,
            borderRadius: 5,
            margin: 1,
            width: width,
        },
        wholeBar: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'yellow',
            width: width * 1,
            borderRadius: 10,
            alignItems: 'center',
            margin: 1,
            padding: 10,
            justifyContent:'space-evenly',
        },
        title:{
            backgroundColor: 'red',
        },
        trashIcon: {
            backgroundColor: 'blue',
        },
    });
    return (
        <View style={styles.container}>
            <FlatList
                extraData={refreshFlatlist}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.wholeBar}>
                            <TouchableOpacity
                                style={styles.title}
                                onPress={() => {
                                    setModal(prev => ({
                                        ...prev,
                                        shabadId: item,
                                        visible: true,
                                    }));
                                }}>
                                <Text>{ALLSHABADS[item].split('\n')[0]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.trashIcon}
                                onPress={() => {
                                    console.log(state.shabadHistory)
                                    dispatch(deleteShabadFromHistory(index))
                                    setRefreshFlatList(!refreshFlatlist)
                                    console.log(state.shabadHistory)
                                }}>
                                <Icon
                                    name="trash-outline"
                                    size={25}
                                    type="ionicon"
                                    color={state.darkMode ? 'black' : 'white'}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                data={state.shabadHistory.reverse()}
                keyExtractor={id => id}
            />
        </View>
    );
}

function getRandomShabadId() {
    const keys = Object.keys(ALLSHABADS);
    const prop = keys[Math.floor(Math.random() * keys.length)];
    return prop;
}
