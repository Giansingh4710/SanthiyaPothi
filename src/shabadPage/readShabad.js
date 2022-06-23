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
  const shabad =
    modalInfo.type == 'bani'
      ? modalInfo.bani
      : ALLSHABADS[modalInfo.shabadData.shabadId];
  const [fontsz, setfontsz] = React.useState(state.fontSizeForShabad);
  const [larrivar, setLarrivar] = React.useState(true);
  const [meanings, setMeanings] = React.useState(true);
  const [shabadSaved, setSavedShabad] = React.useState(
    modalInfo.shabadData ? modalInfo.shabadData.saved : false,
  );

  React.useEffect(() => {
    if (modalInfo.shabadData) setSavedShabad(modalInfo.shabadData.saved);
  }, [modalInfo]);

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      title: modalInfo.bani ? modalInfo.bani_name : 'Random Shabad',
      headerTintColor: state.darkMode ? 'white' : 'black',
      headerTitleStyle: {
        color: state.darkMode ? 'white' : 'black',
      },
      headerRight: () => (
        <RightOfHeader
          state={state}
          icons={
            modalInfo.type == 'shabad'
              ? [
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
                ]
              : [
                  {
                    name: 'settings-outline',
                    action: () => {
                      navigation.navigate('Settings Page');
                    },
                  },
                ]
          }
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
    plusMinusRow: {
      margin: 5,
      flexDirection: 'row',
    },
    bottomActions: {
      marginHorizontal: 10,
    },
    text: {
      color: state.darkMode ? 'white' : 'black',
    },
  });

  return (
    <View style={styles.container}>
      <ShabadText
        sbd={shabad}
        larrivar={larrivar}
        meanings={meanings}
        state={state}
        fontsz={fontsz}
      />
      <ScrollView style={styles.gurbaniScrollView}>
        {/*
        <Text style={styles.shabadText}>
          {showShabad(shabad, larrivar, meanings)}
        </Text>
        */}
      </ScrollView>
      <View style={styles.plusMinusRow}>
        <View style={styles.bottomActions}>
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
        <View style={styles.bottomActions}>
          <Switch
            value={larrivar}
            onValueChange={newSetting => {
              setLarrivar(newSetting);
            }}
          />
          <Text style={styles.text}>larrivar</Text>
        </View>
        <View style={styles.bottomActions}>
          <Switch
            value={meanings}
            onValueChange={newSetting => {
              setMeanings(newSetting);
            }}
          />
          <Text style={styles.text}>meanings</Text>
        </View>
        <View style={styles.bottomActions}>
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

function ShabadText({sbd, larrivar, meanings, state,fontsz}) {
  const styles = StyleSheet.create({
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
  });
  const [clickedInd,setClickedInd]=React.useState(-1);
  const [theClickedLine,setTheLine]=React.useState(null);
  return (
    <View style={styles.gurbaniScrollView}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={sbd.split('\n')}
        renderItem={({item,index}) => {
          let line=item
          if (larrivar && index % 3 == 0) {
            line = line.replace(/ /g, '');
          }
          if (!meanings && index % 3 == 1) return;
          return (
            <TouchableOpacity onPress={()=>{
              if(index==clickedInd){
                setTheLine(theClickedLine.includes(" ")?item.replace(/ /g, ''):item);
                return;
              }
              setClickedInd(index);
              setTheLine(line.includes(" ")?line.replace(/ /g, ''):item);
              console.log(theClickedLine)
            }}>
              <Text style={styles.shabadText}>{clickedInd===index?theClickedLine:line}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

function showShabad(sbd, larrivar, meanings) {
  let ans = '';
  const sbdLst = sbd.split('\n');
  for (let i = 0; i < sbdLst.length; i++) {
    let line = sbdLst[i];
    if (larrivar && i % 3 == 0) {
      line = line.replace(/ /g, '');
    }
    if (!meanings && i % 3 == 1) continue;
    ans += line + '\n';
  }
  return ans;
}
