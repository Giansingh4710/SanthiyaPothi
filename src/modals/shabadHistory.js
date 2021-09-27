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
  setShabadListModal,
  setShabad,
  setShabadModal,
  deleteShabad,
  setSavedShabad,
} from '../../redux/actions';

// import {barStyle} from '../assets/styleForEachOption';

export default function ShabadListModal({heading}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const allShabadsHistory = Object.entries(state.shabadList)
    .map(shabad => shabad[1])
    .reverse();

  return (
    <Modal
      visible={state.shabadShabadListModalShown}
      transparent
      animationType="slide"
      onRequestClose={() => dispatch(setShabadListModal())}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            dispatch(setShabadListModal());
          }}>
          <Icon name="arrow-back-outline" type="ionicon" />
        </TouchableOpacity>
        <Text>{heading}</Text>
        {/* {console.log(
          'All History',
          Object.entries(state.shabadList)
            .map(shabad => shabad[1])
            .reverse(),
        )}
        {console.log(
          'All Pinned',
          Object.entries(state.shabadList).map(shabad => {
            if (shabad[1].pinned) {
              return shabad[1];
            }
          }),
        )} */}
        <View style={styles.scroll}>
          <FlatList
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              // console.log(index, item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      setShabad(
                        item.text, //the shabad test
                        item.date,
                        item.time,
                        false, //'no add to list',
                        item.id, //the shabad id
                        item.pinned,
                        index,
                      ),
                    );
                    dispatch(setShabadModal());
                  }}>
                  <ShabarBar
                    item={item}
                    heading={heading}
                    index={index}
                    dispatch={dispatch}
                  />
                </TouchableOpacity>
              );
            }}
            data={
              heading === 'All History'
                ? allShabadsHistory
                : allShabadsHistory.filter(shabad => shabad.pinned)
            }
          />
        </View>
      </View>
    </Modal>
  );
}

function ShabarBar({item, index, dispatch, heading}) {
  return (
    <View
      style={
        index % 2 === 0
          ? shabadBar.container
          : {...shabadBar.container, backgroundColor: '#7CB9E8'}
      }>
      <Text style={shabadBar.item}>
        {item.text.split('\n')[0] + item.text.split('\n')[1]}
      </Text>
      <Text style={shabadBar.item}>
        time: {item.time}
        {'\n'}
        date : {item.date}
      </Text>

      {heading === 'All History' ? (
        <Icon
          name="close-circle-outline"
          type="ionicon"
          color="#002D62"
          onPress={() => {
            dispatch(deleteShabad(item.id));
          }}
        />
      ) : (
        <Icon
          name="bookmark"
          type="ionicon"
          color="#002D62"
          onPress={() => {
            dispatch(setSavedShabad(item.id));
          }}
        />
      )}
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
