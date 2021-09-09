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
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {
  setShabadHistoryModal,
  setShabad,
  setShabadModal,
} from '../../redux/actions';

// import {barStyle} from '../assets/styleForEachOption';

function HistoryModal() {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  return (
    <Modal
      visible={state.shabadHistoryModalShown}
      transparent
      animationType="slide"
      onRequestClose={() => dispatch(setShabadHistoryModal())}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            dispatch(setShabadHistoryModal());
          }}>
          <Icon name="arrow-back-outline" type="ionicon" />
        </TouchableOpacity>
        <View style={styles.scroll}>
          {/* <ScrollView style={styles.gurbaniScroll}></ScrollView> */}
          <FlatList
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setShabadModal());
                    dispatch(setShabad(item.shabad));
                  }}>
                  <ShabarBar item={item} />
                </TouchableOpacity>
              );
            }}
            data={state.shabadList.map((item, index) => {
              return {
                title: item.split('\n')[0] + item.split('\n')[1],
                shabad: item,
                id: index,
              };
            })}
          />
        </View>
      </View>
    </Modal>
  );
}

function ShabarBar({item}) {
  return (
    <View
      style={
        item.id % 2 === 0
          ? shabadBar.container
          : {...shabadBar.container, backgroundColor: '#7CB9E8'}
      }>
      <Text style={shabadBar.item}>{item.title}</Text>
    </View>
  );
}
const shabadBar = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
  },
  item: {
    flex: 1,
    padding: 5,
    // left: 10,
    // backgroundColor: "yellow",
  },
  text: {
    fontSize: 14,
    fontFamily: 'sans-serif-condensed',
  },
});

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

export default HistoryModal;
