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
import {barStyle} from '../assets/styleForEachOption';
import {
  setShabadModal,
  // setShabad
} from '../redux/actions';

function ShabadModal() {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);
  const [theShabad, setShabad] = React.useState('Vaheguru');

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
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            dispatch(setShabadModal());
          }}>
          {/* <Text>Back</Text> */}
          <Icon
            // style={{flex: 1}}
            // name="arrow-forward-outline"
            name="arrow-back-outline"
            type="ionicon"
            // onPress={() => {}}
          />
        </TouchableOpacity>
        <View style={styles.scroll}>
          <ScrollView style={styles.gurbaniScroll}>
            {/* <Text>{state.theShabad}</Text> */}
            <Text>{theShabad}</Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.newShabad}
          onPress={() => {
            getGurbaniJi().then(res => setShabad(res));
            // dispatch(setShabad());
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
  goBack: {
    // backgroundColor: 'red',
    right: '40%',
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
