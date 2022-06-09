import React from 'react';
import {
  Alert,
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
import {Icon, Switch} from 'react-native-elements';
import {allColors} from '../../assets/styleForEachOption';
import {
  setFontSize,
  addToShabadHistory,
  clearHistory,
  toggleSaveForShabad,
} from '../../redux/actions';
import {ALLSHABADS} from '../../assets/allShabads.js';
import {useDispatch, useSelector} from 'react-redux';
//import {SafeAreaView} from 'react-native-safe-area-context';
import {RightOfHeader} from '../../assets/components/rightOfHeader';
//import {BarOption} from '../../assets/components/baroption';

export default function ReadShabad({navigation, route}) {
  const dispatch = useDispatch();
  let state = useSelector(theState => theState.theReducer);
  //export default function ReadShabad({state, dispatch, setModal, modalInfo}) {
  //if (Object.keys(modalInfo).length == 0) return <></>;

  const modalInfo = route.params;
  const [fontsz, setfontsz] = React.useState(state.fontSizeForShabad);
  const [larrivar, setLarrivar] = React.useState(true);
  const [shabadSaved, setSavedShabad] = React.useState(
    modalInfo.shabadData.saved,
  );

  React.useEffect(() => {
    setSavedShabad(modalInfo.shabadData.saved);
  }, [modalInfo]);

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
              name: shabadSaved ? 'bookmark' : 'bookmark-outline',
              color: state.darkMode ? 'white' : 'black',
              action: () => {
                dispatch(toggleSaveForShabad(modalInfo.index));
                setSavedShabad(prev => !prev);
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
      backgroundColor: allColors[state.darkMode].readShabad.container,
      padding: 10,
      //borderRadius: 5,
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
    btn:{
      marginHorizontal:50,
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.gurbaniScrollView}>
        <Text style={styles.shabadText}>
          {showShabad(ALLSHABADS[modalInfo.shabadData.shabadId],larrivar)}
        </Text>
      </ScrollView>
      <View style={styles.plusMinusRow}>
        <View style={styles.btn}>
          <Icon
            name="remove-outline"
            type="ionicon"
            onPress={() => {
              if (fontszGood(fontsz) === 'small') return;
              setfontsz(prev => prev - 1);
              dispatch(setFontSize(fontsz));
            }}
            size={fontsz * 2}
            color={state.darkMode ? 'white' : 'black'}
          />
        </View>
        <View style={styles.btn}>
          <Switch
            value={larrivar}
            onValueChange={newSetting => {
              setLarrivar(newSetting);
            }}
          />
        </View>
        <View style={styles.btn}>
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
    </View>
  );
}

function showShabad(sbd,larrivar) {
  let ans=""
  const sbdLst=sbd.split('\n');
  for(let i=0;i<sbdLst.length;i++){
    let line=sbdLst[i];
    if(larrivar && i%3==0){
        line=line.replace(/ /g,"");
    }
    ans+=line+"\n";
  }
  return ans;
}
