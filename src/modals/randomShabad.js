import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
// import {barStyle} from '../assets/styleForEachOption';
import {setShabadModal, setShabad, setSavedShabad} from '../../redux/actions';

function ShabadModal() {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);
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
      });
    // console.log(typeof shabad);
    return shabad;
  }

  return (
    <Modal
      visible={state.shabadModalShown}
      transparent
      animationType="slide"
      onRequestClose={() => dispatch(setShabadModal())}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.icons}>
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              onPress={() => {
                dispatch(setShabadModal());
              }}
            />
          </View>
          <Text style={styles.dateTime}>Date: {state.theShabad.time}</Text>
          <Text style={styles.dateTime}>Time: {state.theShabad.date}</Text>

          <View style={styles.icons}>
            <Icon
              name={state.theShabad.saved ? 'bookmark' : 'bookmark-outline'}
              type="ionicon"
              onPress={() => {
                dispatch(setSavedShabad(state.theShabad.id));
              }}
            />
            <Text>{String(state.theShabad.saved)}</Text>
          </View>
        </View>
        <View style={styles.scroll}>
          <ScrollView style={styles.gurbaniScroll}>
            <Text>{state.theShabad.text}</Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.newShabad}
          onPress={() => {
            getGurbaniJi().then(res => {
              const currentDate = new Date();
              dispatch(
                setShabad(
                  res, //the shabad text
                  currentDate.toLocaleDateString(), // the date
                  String(currentDate.getHours()).padStart(2, '0') +
                    ':' +
                    String(currentDate.getMinutes()).padStart(2, '0'),
                  true, //add to shabad lst
                  0, //0 means no id so id needed
                  false, //saved=false
                ),
              );
            });
          }}>
          <Text>Get New Random Shabad</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  //   ...barStyle,
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007FFF',
    height: '70%',
    width: '90%',
    top: '15%',
    left: '5%',
    borderRadius: 40,
  },
  topRow: {
    flexDirection: 'row',
  },
  icons: {
    // backgroundColor: 'red',
    flex: 0.5,
  },
  dateTime: {
    flex: 1,
  },
  scroll: {
    padding: 10,
    height: '80%',
    width: '95%',
  },
  gurbaniScroll: {
    borderRadius: 20,
    padding: 30,
    backgroundColor: 'rgba(114,160,193,1)',
  },
  newShabad: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#00FFFF',
  },
});

export default ShabadModal;
