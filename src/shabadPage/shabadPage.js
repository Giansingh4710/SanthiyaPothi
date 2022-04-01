import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Button,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {allColors} from '../../assets/styleForEachOption';
import {setFontSize} from '../../redux/actions';
import {RightOfHeader} from '../../assets/components/rightOfHeader';
import {ALLSHABADS} from '../../assets/allShabads.js';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
export default function ShabadScreen({navigation}) {
    const dispatch = useDispatch();
    let state = useSelector(theState => theState.theReducer);

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

    const [imgActive, setImgActive] = React.useState(0);

    const onchange = nativeEvent => {
        if (nativeEvent) {
            const slide = Math.ceil(
                nativeEvent.contentOffset.x /
                    nativeEvent.layoutMeasurement.width,
            );
            if (slide != imgActive) {
                setImgActive(slide);
            }
        }
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: allColors[state.darkMode].mainBackgroundColor,
            flex: 1,
        },
        wrap: {
            width: WIDTH,
            height: HEIGHT * 0.8,
        },
        scrollView: {
            //padding: 10,
            //margin:10,
            //justifyContent: 'center',
            //alignItems: 'center',
            //flex: 1,
            //backgroundColor: 'yellow',
        },
        eachComponent: {
            width: WIDTH,
            //backgroundColor: 'red',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        wrapDot: {
            position: 'absolute',
            bottom: -20,
            flexDirection: 'row',
            alignSelf: 'center',
        },
        dotActive: {
            margin: 3,
            color: 'black',
        },
        dot: {
            margin: 3,
            color: '#888',
        },
    });

    const images = [
        <ShabadView state={state} dispatch={dispatch} />,
        <ShabadView state={state} dispatch={dispatch} />,
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <ScrollView
                    onScroll={({nativeEvent}) => onchange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    paddingEnabled
                    horizontal
                    //style={styles.scrollView}
                    contentContainerStyle={styles.scrollView}>
                    {images.map((comp, index) => {
                        return (
                            <View key={`${index}`} style={styles.eachComponent}>
                                {comp}
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={styles.wrapDot}>
                    {images.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={
                                imgActive === index
                                    ? styles.dotActive
                                    : styles.dot
                            }>
                            ●
                        </Text>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

function ShabadView({state, dispatch}) {
    const [shabad, setShabad] = React.useState(false);
    const [fontsz, setfontsz] = React.useState(state.fontSizeForShabad);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#007FFF',
            borderRadius: 5,
            padding: 10,
            //width: WIDTH * 0.9,
            width: WIDTH * 0.99,
        },
        gurbaniScrollView: {
            backgroundColor: '#888',
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
            backgroundColor: '#00FFFF',
        },
    });

    console.log(fontsz)
    function fontszGood(num){
        if (num<10) return "small"; //too small
        if (num>27) return "big"; // too big
        return true;
    }
    return (
        <View style={styles.container}>
            {shabad == false ? (
                <></>
            ) : (
                <ScrollView style={styles.gurbaniScrollView}>
                    <Text style={styles.shabadText}>{shabad}</Text>
                </ScrollView>
            )}
            <View style={styles.plusMinusRow}>
                <Icon
                    name="remove-outline"
                    type="ionicon"
                    onPress={() => {
                        if(fontszGood(fontsz)==='small') return;
                        setfontsz(prev => prev - 1);
                        dispatch(setFontSize(fontsz));
                    }}
                    size={fontsz + 12}
                    color={state.darkMode ? 'white' : 'black'}
                />
                <TouchableOpacity
                    style={styles.newShabadBtn}
                    onPress={() => setShabad(getRandomShabad())}>
                    <Text style={styles.shabadText}>Get New Random Shabad</Text>
                </TouchableOpacity>
                <Icon
                    size={fontsz * 2}
                    color={state.darkMode ? 'white' : 'black'}
                    name="add-outline"
                    type="ionicon"
                    onPress={() => {
                        if(fontszGood(fontsz)==='big') return;
                        setfontsz(prev => prev + 1);
                        dispatch(setFontSize(fontsz));
                    }}
                />
            </View>
        </View>
    );
}

function getRandomShabad() {
    const keys = Object.keys(ALLSHABADS);
    console.log(keys.length);
    const prop = keys[Math.floor(Math.random() * keys.length)];
    return ALLSHABADS[prop];
}
