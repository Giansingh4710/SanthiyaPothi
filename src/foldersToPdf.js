import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';

import {CheckBox, Icon} from 'react-native-elements';

import {useSelector, useDispatch} from 'react-redux';
import {setCheckBox, setAddedPDFs, deleteAddedItem} from '../redux/actions';
import {barStyles, allColors} from '../assets/styleForEachOption';
import AddedFiles from '../assets/otherScreens/addedFiles';
import DocumentPicker from 'react-native-document-picker';

export default function FolderToPdfs({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const [modalOn, setModal] = React.useState(false);
  const folderTitle = route.params.folderTitle;
  const baniaList = route.params.list;
  console.log('from state', state.addedPdfs);
  // const baniaList = state.addedPdfs;

  for (let i = 0; i < baniaList.length; i++) {
    console.log(i + 1, ')', baniaList[i]);
  }
  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerTitle: () => <Text>{folderTitle}</Text>,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          {folderTitle == 'Added PDFs' ? (
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
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          //item={"title": "11) Jaitsri Ki Vaar Mahala 5.pdf"}
          return EachBani(navigation, item, barStyle, state, dispatch);
        }}
        data={baniaList}
      />
      <AddFile
        visible={modalOn}
        setVisibility={setModal}
        // setList={setBaniaList}
        dispatch={dispatch}
        folderTitle={folderTitle}></AddFile>
    </View>
  );
}

function EachBani(navigation, item, styles, state, dispatch) {
  const isFolder = item.list ? true : false;
  return (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          // console.log('is Folder: ', isFolder);
          if (!isFolder) navigation.navigate('OpenPdf', {pdfTitle: item.title});
          else
            navigation.navigate('BanisList2', {
              list: item.list,
              folderTitle: item.title, //name of the bar clicked on
            });
        }}>
        {isFolder ? (
          <>
            <Icon style={styles.icons} name="folder-outline" type="ionicon" />
            <Text style={styles.titleText}>{item.title}</Text>
            <Icon
              style={styles.icons}
              name="trash-outline"
              type="ionicon"
              onPress={() => {
                dispatch(deleteAddedItem(item.title));
              }}
            />
          </>
        ) : (
          <Text style={styles.titleText}>{item.title}</Text>
        )}
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
      </TouchableOpacity>

      <View style={styles.gap}></View>
    </View>
  );
}

function AddFile({visible, setVisibility, folderTitle, dispatch}) {
  // 'Adi Maharaj.pdf': {
  //   checked: false,
  //   baniType: 'Sri Guru Granth Sahib Jee',
  //   currentAng: 1,
  //   uri: 'bundle-assets://pdfs/SriGuruGranthSahibJee/AdiMaharaj.pdf',
  // },

  // {
  // title: 'Sri Guru Granth Sahib Jee',
  // list: [{title: 'Adi Maharaj.pdf'}, {title: 'Fareedkot Teeka.pdf'}],
  // },

  const [folderName, setFolderName] = React.useState();
  async function pickDoc() {
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker.types.pdf],
      });
      const name = res[0].name;
      const uri = res[0].uri;
      // setList(prev => {
      //   prev.push({title: name});
      //   return prev;
      // });
      setVisibility(false);
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
        <TextInput
          // keyboardType="numeric"
          // value={currrentAng.toString()}
          style={{backgroundColor: '#cecece', borderRadius: 5}}
          placeholder="exp: Folder 1"
          onChangeText={e => {
            setFolderName(e);
          }}
          // onSubmitEditing={e => {
          //   const theText = e.nativeEvent.text;
          //   console.log(theText);
          //   setFolderName(theText);
          // }}
        />
        <View style={styles.underScroll}>
          <TouchableOpacity
            style={styles.ButtomButton}
            onPress={() => {
              dispatch(
                setAddedPDFs(folderTitle, {title: folderName, list: []}),
              );
              setVisibility(false);
            }}>
            <Text style={styles.shabadtext}>Add a folder</Text>
          </TouchableOpacity>

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
