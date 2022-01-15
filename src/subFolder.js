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
import {setCheckBox, setAddedPDFs, deleteAddedItem} from '../redux/actions';
import {barStyles, allColors} from '../assets/styleForEachOption';
import DocumentPicker from 'react-native-document-picker';

export default function FolderToPdfs2({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const [modalOn, setModal] = React.useState(false);
  const [baniaList, setBaniaList] = React.useState(route.params.list);
  const folderTitle = route.params.folderTitle;

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerTitle: () => <Text>{folderTitle}</Text>,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerBtns}
            onPress={() => {
              setModal(true);
            }}>
            <Icon name="add-outline" type="ionicon"></Icon>
          </TouchableOpacity>
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
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          //item={"title": "11) Jaitsri Ki Vaar Mahala 5.pdf"}
          return EachAddedItem(
            navigation,
            item,
            barStyle,
            state,
            dispatch,
            setBaniaList,
          );
        }}
        data={baniaList}
      />
      <AddFileModal
        visible={modalOn}
        setVisibility={setModal}
        setList={setBaniaList}
        dispatch={dispatch}
        folderTitle={folderTitle}></AddFileModal>
    </View>
  );
}

function EachAddedItem(
  navigation,
  item,
  styles,
  state,
  dispatch,
  setBaniaList,
) {
  const isFolder = item.list ? true : false;
  return (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (!isFolder) navigation.navigate('OpenPdf', {pdfTitle: item.title});
          else
            navigation.navigate('BanisList2', {
              list: item.list,
              folderTitle: item.title, //name of the bar clicked on
            });
        }}>
        {isFolder ? (
          <Icon style={styles.icons} name="folder-outline" type="ionicon" />
        ) : (
          <></>
        )}

        <Text style={styles.titleText}>{item.title}</Text>
        {/* {!isFolder ? ( */}
        {state.allPdfs[item.title] ? (
          <CheckBox
            checked={state.allPdfs[item.title].checked}
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
        ) : (
          <></>
        )}
        <Icon
          style={styles.icons}
          name="trash-outline"
          type="ionicon"
          onPress={() => {
            dispatch(deleteAddedItem(item.title));
            dispatch(addNdeletePdf(item.title, '_', false));
            setBaniaList(state.addedPdfs.list);
          }}
        />
      </TouchableOpacity>

      <View style={styles.gap}></View>
    </View>
  );
}

function AddFileModal({
  state,
  visible,
  setVisibility,
  setBaniaList,
  folderTitle,
  dispatch,
}) {
  async function pickDoc() {
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker.types.pdf],
      });
      const name = res[0].name;
      const uri = res[0].uri;
      const details = {
        checked: false,
        baniType: folderTitle,
        currentAng: 1,
        uri: uri,
      };
      if (state.allPdfs[name]) {
        // sameFileAlert();
        return;
      }
      dispatch(addNdeletePdf(name, details, true));
      dispatch(setAddedPDFs(folderTitle, {title: name}));
      setVisibility(false);
    } catch (err) {
      // alert(err);
      console.log(err);
    }
  }
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0FF',
      height: '55%',
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
    underScroll: {
      flex: 1,
      flexDirection: 'row',
    },
    ButtomButton: {
      padding: 10,
      margin: 10,
      flex: 1,
      flexDirection: 'row',
      width: 200,
      height: 50,
      borderRadius: 40,
      backgroundColor: '#f9f871',
      justifyContent: 'center',
      alignItems: 'center',
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
        <View style={styles.underScroll}>
          <TouchableOpacity
            style={styles.ButtomButton}
            onPress={() => {
              pickDoc();
            }}>
            <Text style={styles.shabadtext}>Add a file</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
