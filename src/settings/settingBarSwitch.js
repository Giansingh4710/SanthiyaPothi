import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Switch, Icon} from 'react-native-elements';

import {useDispatch} from 'react-redux';
import {setDarkMode} from '../../redux/actions';

function SwitchBar({SettingTitle, icons, currently}) {
  const dispatch = useDispatch();
  // const state = useSelector(theState => theState.theReducer);
  // const colors = theColors[state.darkMode];

  const styles = StyleSheet.create({
    container: {
      height: 50,
    },
    settingBar: {
      flexDirection: 'row',
      width: '100%',
      height: '99%',
      backgroundColor: '#75f1e0',
    },
    image: {
      // flex: 1,
      width: '30%',
      height: '100%',
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
