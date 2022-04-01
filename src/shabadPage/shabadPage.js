import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {allColors} from '../../assets/styleForEachOption';
import {useDispatch, useSelector} from 'react-redux';
import {RightOfHeader} from '../../assets/components/rightOfHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
      flex: 1,
    },
    wrap: {
      width: WIDTH,
      height: HEIGHT * 0.5,
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

  const onchange = nativeEvent => {
    if(nativeEvent){
      const slide=Math.ceil(nativeEvent.contentOffset.x /nativeEvent.layoutMeasurement.width)
      if (slide!=imgActive){
        setImgActive(slide);
      }
    }
  };
  const images = [
    'https://cdn.pixabay.com/photo/2020/01/03/17/18/architecture-4738647_960_720.jpg',
    'https://www.sikhnet.com/files/styles/hero-image/public/news/image/main/Vaheguru_0.jpg?itok=_bL549vp',
    //'https://www.sikhnet.com/files/styles/hero-image/public/news/image/main/Vaheguru_0.jpg?itok=_bL549vp',
  ];

  //<Text style={{fontSize: 30}}>This is a modal!</Text>
  //<Button onPress={() => navigation.goBack()} title="Dismiss" />
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          paddingEnabled
          horizontal
          //style={styles.wrap}
        >
          {images.map((e, index) => {
            return (
              <Image
                key={e}
                resizeMode={'stretch'}
                style={styles.wrap}
                source={{uri: e}}
              />
            );
          })}
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style={imgActive === index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
