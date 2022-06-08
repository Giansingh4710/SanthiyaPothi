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
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Switch} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {allColors} from '../../assets/styleForEachOption';
import {
  setFontSize,
  addToShabadHistory,
  clearHistory,
  toggleSaveForShabad,
} from '../../redux/actions';
import {RightOfHeader} from '../../assets/components/rightOfHeader';
import {ALLSHABADS} from '../../assets/allShabads.js';
import {BarOption} from '../../assets/components/baroption';

export default function ShabadScreen({navigation}) {
  const dispatch = useDispatch();
  let state = useSelector(theState => theState.theReducer);
  const [shabadModalStuff, setShabadModalStuff] = React.useState({
    visible: false,
    shabadData: {saved: false, shabadId: "EWD"},
    index:-1,
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    openShabadBtn: {
      backgroundColor: 'blue',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      margin: 10,
    },
    eachPage: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
  });

  const pages = [
    <ShabadHistoryView
      key={'1'}
      state={state}
      dispatch={dispatch}
      setModal={setShabadModalStuff}
      modalInfo={shabadModalStuff}
      navigation={navigation}
    />,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.openShabadBtn}
        onPress={() => {
          navigation.navigate('ReadShabad')
          const theID = getRandomShabadId();
          const theObj = {shabadId: theID, saved: false};
          setShabadModalStuff({
            visible: true,
            shabadData: theObj,
            index: state.shabadHistory.length,
          });
          dispatch(addToShabadHistory(theObj));
        }}>
        <Text>Open Random Shabad</Text>
      </TouchableOpacity>
      <FlatList
        data={pages}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        renderItem={({item}) => {
          return item;
          //return <View style={styles.eachPage}>{item}</View>;
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
  //if (Object.keys(modalInfo).length == 0) return <></>;
  const [fontsz, setfontsz] = React.useState(state.fontSizeForShabad);
  const [shabadSaved,setSavedShabad]=React.useState(modalInfo.shabadData.saved);
  console.log(modalInfo);
  React.useEffect(()=>{
    setSavedShabad(modalInfo.shabadData.saved)
  },[modalInfo])
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
            onPress={() => {
              dispatch(toggleSaveForShabad(modalInfo.index));
              setSavedShabad(prev=>!prev)
            }}
            style={styles.headerBtns}>
            <Icon
              name={
                shabadSaved ? 'bookmark' : 'bookmark-outline'
              }
              //name="bookmark-outline"
              size={25}
              type="ionicon"
              color={state.darkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.gurbaniScrollView}>
          <Text style={styles.shabadText}>
            {ALLSHABADS[modalInfo.shabadData.shabadId]}
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

function ShabadHistoryView({state, dispatch, setModal, navigation}) {
  const [showSaved, setShowSaved] = React.useState(false);
  const listOfData = state.shabadHistory.slice().reverse();
  function getShabadTitle(id) {
    return ALLSHABADS[id].slice(0, 30).replace(/\n/g, ' ') + '...';
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      margin: 5,
      padding: 5,
      //width: WIDTH,
      //backgroundColor: 'blue',
    },
    titleText: {
      color: state.darkMode ? 'white' : 'black',
    },
  });
  //console.log(listOfData)
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {showSaved ? 'Saved Shabads' : 'All History'}
      </Text>
      <Switch
        value={showSaved}
        onValueChange={newSetting => {
          setShowSaved(newSetting);
        }}
      />
      <FlatList
        data={listOfData}
        keyExtractor={item => item.shabadId + Math.random()} //incase shabadId is same twice
        renderItem={({item, index}) => {
          //console.log(item);
          //item={"saved": false, "shabadId": "EWD"}
          if (showSaved && !item.saved) return;
          return (
            <BarOption
              state={state}
              onClick={() => {
                setModal({
                  visible: true,
                  shabadData: item,
                  index: listOfData.length - 1 - index,
                });
              }}
              left={
                <Icon
                  name="reader-outline"
                  type="ionicon"
                  color={state.darkMode ? 'white' : 'black'}
                />
              }
              text={getShabadTitle(item.shabadId)}
              right={
                <Icon
                  name="arrow-forward-outline"
                  size={25}
                  type="ionicon"
                  color={state.darkMode ? 'white' : 'black'}
                />
              }
            />
          );
        }}
        ListEmptyComponent={
          <BarOption
            state={state}
            onClick={() => {
              const theID = getRandomShabadId();
              const theObj = {shabadId: theID, saved: false};
              setModal(prev => ({
                visible: true,
                shabadData: theObj,
                index: 0, //this will only show up if list is empty so automaticly know its 0
              }));
              dispatch(addToShabadHistory(theObj));
            }}
            left={
              <Icon
                name="reader-outline"
                type="ionicon"
                color={state.darkMode ? 'white' : 'black'}
              />
            }
            text={'Click Here to Open Shabad.       '}
            right={
              <Icon
                name="arrow-forward-outline"
                size={25}
                type="ionicon"
                color={state.darkMode ? 'white' : 'black'}
              />
            }
          />
        }
      />
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Delete All Shabad History!',
            "By Clicking 'OK', You will delete all your history. This can not be undone.",
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  dispatch(clearHistory());
                  navigation.goBack(); // it didn't refresh right away so go back when you delete all history
                },
              },
            ],
          );
          dispatch(clearHistory());
        }}>
        <Icon
          name="trash-outline"
          size={25}
          type="ionicon"
          color={state.darkMode ? 'white' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
}

function getRandomShabadId() {
  const keys = Object.keys(ALLSHABADS);
  const prop = keys[Math.floor(Math.random() * keys.length)];
  return prop;
}
