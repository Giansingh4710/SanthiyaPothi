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
    return shabad;
  }

  const [theFontSize, setFontSize] = React.useState(20);
  const styles = StyleSheet.create({
    //   ...barStyle,
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#007FFF',
      height: '75%',
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
      flex: 0.75,
    },
    dateTime: {
      flex: 1,
    },
    scroll: {
      padding: 15,
      height: '80%',
      width: '100%',
    },
    gurbaniScroll: {
      borderRadius: 20,
      padding: 15,
      backgroundColor: 'rgba(114,160,193,1)',
    },
    theShabad: {
      paddingBottom: 10,
      fontSize: theFontSize,
    },
    plusMinusRow: {
      // backgroundColor: 'red',
      flexDirection: 'row',
    },
    newShabad: {
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#00FFFF',
    },
  });

  return (
    <Modal
      visible={state.shabadModalShown}
      transparent
      animationType="slide"
      onRequestClose={() => dispatch(setShabadModal())}>
      <View style={styles.container}>
        {state.theShabad ? (
          <View>
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
              <Text style={styles.dateTime}>
                Date: {state.shabadList[state.theShabad].date}
              </Text>
              <Text style={styles.dateTime}>
                Time: {state.shabadList[state.theShabad].time}
              </Text>

              <View style={styles.icons}>
                <Icon
                  name={
                    state.shabadList[state.theShabad].pinned
                      ? 'bookmark'
                      : 'bookmark-outline'
                  }
                  type="ionicon"
                  onPress={() => {
                    dispatch(setSavedShabad(state.theShabad));
                  }}
                />
              </View>
              {/* <Text>{String(state.shabadList[state.theShabad].pinned)}</Text> */}
            </View>
            <View style={styles.scroll}>
              <ScrollView style={styles.gurbaniScroll}>
                <Text style={styles.theShabad}>
                  {state.shabadList[state.theShabad].text}
                </Text>
              </ScrollView>
            </View>
            <View style={styles.plusMinusRow}>
              <View style={{flex: 1}}>
                <Icon
                  name="add-outline"
                  type="ionicon"
                  onPress={() => {
                    setFontSize(prev => prev + 1);
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <Icon
                  style={{flex: 1}}
                  name="remove-outline"
                  type="ionicon"
                  onPress={() => {
                    setFontSize(prev => prev - 1);
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}
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
                  '0', //0 means no id so id needed
                  false, //saved=false
                  //0, //the index here will be zero because we put this to top of list
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

export default ShabadModal;
