import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Icon, Switch} from 'react-native-elements';
import {allColors} from '../../assets/styleForEachOption';
import {
  setFontSize,
  toggleSaveForShabad,
} from '../../redux/actions';
import {ALLSHABADS} from '../../assets/allShabads.js';
import {useDispatch, useSelector} from 'react-redux';
import {RightOfHeader} from '../../assets/components/rightOfHeader';

export default function ReadShabad({navigation, route}) {
  const dispatch = useDispatch();
  let state = useSelector(theState => theState.theReducer);
  const modalInfo = route.params;
  const shabad =
    modalInfo.type == 'bani'
      ? modalInfo.bani
      : ALLSHABADS[modalInfo.shabadData.shabadId];
  const [fontsz, setfontsz] = React.useState(state.fontSizeForShabad);
  const [larrivar, setLarrivar] = React.useState(true);
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
        state={state}
        fontsz={fontsz}
      />
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

function ShabadText({sbd, larrivar, state, fontsz}) {
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
  // const [clickedInd, setClickedInd] = React.useState(-1);
  // const [theClickedLine, setTheLine] = React.useState(null);
  // console.log(sbd.split('\n').length)
  return (
    <View style={styles.gurbaniScrollView}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={sbd.split('\n')}
        // initialNumToRender={50}
        // maxToRenderPerBatch={200}
        // windowSize={41}
        renderItem={({item, index}) => {
          const lineType=index % 3 === 0?"Gurbani":'Not Gurbani'
          return <ShabadLine larrivar={larrivar}  line={item} lineType={lineType} shabadTextStyle={styles.shabadText}/>
          // let line = item;
          // if (larrivar && index % 3 == 0) {
          //   line = line.replace(/ /g, '');
          // }
          // return (
          //   <TouchableOpacity
          //     onPress={() => {
          //       if (index == clickedInd) {
          //         setTheLine(
          //           theClickedLine.includes(' ')
          //             ? item.replace(/ /g, '')
          //             : item,
          //         );
          //         return;
          //       }
          //       setClickedInd(index);
          //       setTheLine(line.includes(' ') ? line.replace(/ /g, '') : item);
          //       console.log(theClickedLine);
          //     }}
          //     onLongPress={() => {
          //       Clipboard.setString(line);
          //       console.log(line)
          //     }}>
          //     <Text style={styles.shabadText}>
          //       {clickedInd === index ? theClickedLine : line}
          //     </Text>
          //   </TouchableOpacity>
          // );
        }}
      />
    </View>
  );
}

function ShabadLine({larrivar, line, lineType, shabadTextStyle}) {
  //larrivarLine is larrivar is gurbani otherwise is regular line
  const larrivarLine = lineType === 'Gurbani' ? line.replace(/ /g, '') : line;
  const padChedLine = line;
  const [lineLarrivar, setLarrivar] = React.useState(larrivar); //true=larrivar false=padChed

  React.useEffect(() => {
    setLarrivar(larrivar);
  }, [larrivar]);
  return (
    <TouchableOpacity
      onPress={() => {
        setLarrivar(!lineLarrivar);
      }}
      onLongPress={() => {
        Clipboard.setString(lineLarrivar ? larrivarLine : padChedLine);
        // console.log(lineLarrivar ? larrivarLine : padChedLine)
      }}>
      <Text style={shabadTextStyle}>
        {lineLarrivar ? larrivarLine : padChedLine}
      </Text>
    </TouchableOpacity>
  );
}
