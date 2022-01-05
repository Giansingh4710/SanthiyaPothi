/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {View, StyleSheet, ScrollView, Settings} from 'react-native';

import {useSelector} from 'react-redux';
import SwitchBar from './settingBarSwitch';
// import SettingsBar from './settingBar';

// import theColors from '../../util/colors';
import {allColors} from '../../assets/styleForEachOption';
function SettingsPage({navigation}) {
  const state = useSelector(theState => theState.theReducer);
  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
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
      height: '100%',
    },
  });
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <SwitchBar
          SettingTitle="Dark Mode"
          icons={['moon', 'sunny']} //if true icon=moon, if false icon=sunny
          currently={state.darkMode} //only true or false
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
    </View>
  );
}

// TODO - Move all colors to separate file and import as variables.

export default SettingsPage;
