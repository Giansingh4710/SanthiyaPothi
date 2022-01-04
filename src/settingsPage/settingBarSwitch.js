import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch, Icon} from 'react-native-elements';

import {useDispatch, useSelector} from 'react-redux';
import {setDarkMode} from '../../redux/actions';

import {allColors} from '../../assets/styleForEachOption';
function SwitchBar({SettingTitle, icons, currently}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const theColors = allColors[state.darkMode].settingBarSwitch;
  const styles = StyleSheet.create({
    container: {
      height: 50,
    },
    settingBar: {
      flexDirection: 'row',
      width: '100%',
      height: '99%',
      backgroundColor: theColors.settingBar.backgroundColor,
    },
    text1: {
      flex: 1,
    },
    rightSide: {
      flex: 1,
      flexDirection: 'row',
    },
  });

  const [currentVal, setCurrentVal] = React.useState(currently);

  function capitalizeFirstLetter(str) {
    const string = String(str);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.settingBar}>
        <Icon name={currentVal ? icons[0] : icons[1]} type="ionicon"></Icon>
        <Text style={styles.text1}>{SettingTitle}</Text>

        <View style={styles.rightSide}>
          <Text style={styles.text2}>{capitalizeFirstLetter(currentVal)}</Text>
          <Switch
            value={currentVal}
            onValueChange={newSetting => {
              setCurrentVal(newSetting);
              dispatch(setDarkMode(newSetting));
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default SwitchBar;
