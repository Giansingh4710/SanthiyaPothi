/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import RNRestart from 'react-native-restart';

import {useSelector, useDispatch} from 'react-redux';
import SwitchBar from './settingBarSwitch';
// import SettingsBar from './settingBar';

import {setDarkMode,setHideHeader} from '../../redux/actions';
import {allColors} from '../../assets/styleForEachOption';
import {setData, initialState} from '../../redux/reducers';
import {setTheState} from '../../redux/actions';

function SettingsPage({navigation}) {
  const state = useSelector(theState => theState.theReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      }
    });
  });

  const theColors = allColors[state.darkMode].settings;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
      width: '100%',
      height: '100%',
      paddingTop: '10%',
    },
    title: {
      fontSize: 32,
      flex: 2,
      right: 20,
    },
    scroll: {
      width: '100%',
      // height: '100%',
    },
    resetBtn: {
      margin:10,
      height: 50,
      //width: '100%',
      //height: '99%',
      backgroundColor: 'red'
    },
  });
  const createThreeButtonAlert = () =>
    Alert.alert(
      'Are you Sure you want to reset all Data?',
      'This will delete all added pdfs , checked off boxes and last left off angs',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setData('state', initialState);
            dispatch(setTheState(initialState));
            RNRestart.Restart();
          },
        },
      ],
    );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <SwitchBar
          SettingTitle="Dark Mode"
          icons={['moon', 'sunny']} //if true icon=moon, if false icon=sunny
          nameInState={'darkMode'} //only true or false
          setter={setDarkMode}
        />
        <SwitchBar
          SettingTitle="Hide Header On Scroll"
          icons={['chevron-up-circle', 'close-outline']} //if true icon=moon, if false icon=sunny
          nameInState={'hideHeaderOnScroll'} //only true or false
          setter={setHideHeader}
        />
        {/* <SettingsBar
          theSetting="Type of Words"
          theList={['Both', 'Gurbani', 'Punjabi']} // the 0 index in theList is the default setting
          imageSource="khalislogo150"
          theAction={setTypeOfWords} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={['Both', 'Gurbani', 'Punjabi'].indexOf(
            state.typesOfWords,
          )}
        />
        <SwitchBar
          theSetting="Show Pop Up after each word"
          theList={[true, false]}
          imageSource="ikOngkar"
          theAction={setShowPopUp} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={[true, false].indexOf(state.showPopUp)}
        /> */}
      </ScrollView>
      <TouchableOpacity
        onPress={() => createThreeButtonAlert()}
        style={styles.resetBtn}>
        <Text>Reset State</Text>
      </TouchableOpacity>
    </View>
  );
}

// TODO - Move all colors to separate file and import as variables.

export default SettingsPage;
