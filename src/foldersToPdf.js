import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';

import {CheckBox, Icon} from 'react-native-elements';

import {useSelector, useDispatch} from 'react-redux';
import {setCheckBox} from '../redux/actions';
import {barStyles, allColors} from '../assets/styleForEachOption';
import AddedFiles from '../assets/otherScreens/addedFiles';
import DocumentPicker from 'react-native-document-picker';

export default function FolderToPdfs({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const [modalOn, setModal] = React.useState(false);

  const folderTitle = route.params.folderTitle;
  const baniyaList = route.params.list;

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerTitle: () => <Text>{folderTitle}</Text>,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          {folderTitle == 'Added Files' ? (
            <TouchableOpacity
              style={styles.headerBtns}
              onPress={() => {
                setModal(true);
              }}>
              <Icon name="add-outline" type="ionicon"></Icon>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity style={styles.headerBtns} onPress={() => {}}>
            <Icon name="shuffle-outline" type="ionicon"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtns}
            onPress={() => {
              navigation.navigate('Settings Page');
            }}>
            <Icon name="settings-outline" type="ionicon"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const barStyle = barStyles[state.darkMode].barStyle;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
      height: '100%',
    },
    headerBtnsCont: {
      flex: 1,
      flexDirection: 'row',
    },
    headerBtns: {
      flex: 1,
      padding: 10,
    },
  });
  // if (folderTitle == 'Added Files') return <AddedFiles></AddedFiles>;
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          return EachBani(navigation, item, barStyle, state, dispatch);
        }}
        data={baniyaList}
      />
      <AddFile visible={modalOn} setVisibility={setModal}></AddFile>
    </View>
  );
}

function EachBani(navigation, item, styles, state, dispatch) {
  return (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('OpenPdf', {pdfTitle: item.title});
        }}>
        <Text style={styles.titleText}>{item.title}</Text>

        <CheckBox
          checked={state.checkBoxes[item.title].checked}
          checkedColor="#0F0"
          checkedTitle="ਸੰਪੂਰਨ"
          containerStyle={{
            borderRadius: 10,
            padding: 10,
            backgroundColor: 'black',
          }}
          onPress={() => {
            dispatch(setCheckBox(item.title));
          }}
          size={20}
          textStyle={{
            fontSize: 10,
            height: 20,
            color: 'white',
          }}
          title="Not Done"
          titleProps={{}}
          uncheckedColor="#F00"
        />
      </TouchableOpacity>

      <View style={styles.gap}></View>
    </View>
  );
}

function AddFile({visible, setVisibility}) {
  async function pickDoc() {
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker.types.pdf],
      });
      const name = res[0].name;
      const uri = res[0].uri;
      console.log(name, uri);
    } catch (err) {
      // alert(err);
      setVisibility(false);
      console.log(err);
    }
  }
  const styles = StyleSheet.create({
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
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {
        setVisibility(false);
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => {
            setVisibility(false);
          }}>
          <Icon name="close-outline" type="ionicon"></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickDoc()}>
          <Text>Hi Added container</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
