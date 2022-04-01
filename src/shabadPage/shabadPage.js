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
import {Icon} from 'react-native-elements';
import {allColors} from '../../assets/styleForEachOption';
import {useDispatch, useSelector} from 'react-redux';
import {RightOfHeader} from '../../assets/components/rightOfHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

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
            height: HEIGHT * 0.7,
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
            //padding: 10,
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

    const images = [<ShabadView state={state} dispatch={dispatch}/>];

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
    async function getGurbaniJi() {
        let shabad = '';
        await fetch('https://api.gurbaninow.com/v2/shabad/random')
            .then(res => res.json())
            .then(resJson => {
                const shabadOLstbj = resJson.shabad;
                for (const index in shabadOLstbj) {
                    const gurmukhi = shabadOLstbj[index].line.larivaar.unicode;
                    const translation =
                        shabadOLstbj[index].line.translation.english.default;
                    shabad += gurmukhi + '\n' + translation + '\n';
                }
            })
            .catch(er => {
                shabad = 'Vaheguru. No internet';
                console.log(er);
            });
        return shabad;
    }

    const [shabad, setShabad] = React.useState('Vaheguru');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: '#007FFF',
            width: WIDTH * 0.9,
        },
        shabadText: {
            padding:10,
            color: state.darkMode ? 'white' : 'black',        },
        newShabad: {
            //borderRadius: 5,
            //padding: 10,
            backgroundColor: '#00FFFF',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.shabadText}>{shabad}</Text>
            <TouchableOpacity
                style={styles.newShabad}
                onPress={() => {
                    getGurbaniJi().then(res => {
                        setShabad(res);
                        //const currentDate = new Date();
                        //dispatch(
                        //setShabad(
                        //res, //the shabad text
                        //currentDate.toLocaleDateString(), // the date
                        //String(currentDate.getHours()).padStart(2, '0') +
                        //':' +
                        //String(currentDate.getMinutes()).padStart(2, '0'),
                        //true, //add to shabad lst
                        //'0', //0 means no id so id needed
                        //false, //saved=false
                        ////0, //the index here will be zero because we put this to top of list
                        //),
                        //);
                    });
                }}>
                <Text>Get New Random Shabad</Text>
            </TouchableOpacity>
        </View>
    );
}
