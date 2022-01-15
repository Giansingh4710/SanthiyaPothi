import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';

import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';

import {useSelector, useDispatch} from 'react-redux';
import {
  setCheckBox,
  setAddedPDFs,
  deleteAddedItem,
  addNdeletePdf,
} from '../redux/actions';
import {allOriginalFolders} from '../assets/longData';
import {barStyles, allColors} from '../assets/styleForEachOption';
import AddedFiles from '../assets/otherScreens/addedFiles';
import DocumentPicker from 'react-native-document-picker';

export default function FolderToPdfs({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const [modalOn, setModal] = React.useState(false);
  const folderTitle = route.params.folderTitle;

  const [baniaList, setBaniaList] = React.useState(route.params.list);

  // React.useLayoutEffect(() => {
  //   setBaniaList(route.params.list);
  // }, [navigation]);
  React.useEffect(() => {
    if (folderTitle === 'Added PDFs') setBaniaList(state.addedPdfs.list);
  });
  React.useEffect(() => {
    if (folderTitle === 'ਪਾਠ Hajari')
      setBaniaList(
        Object.entries(state.allPdfs)
          .filter(bani => {
            return bani[1].currentAng !== 1 && bani[1].checked === false;
          })
          .map(bani => {
            return {title: bani[0]};
          }),
      );
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
  }, [navigation.isFocused()]);

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
  if (allOriginalFolders.includes(folderTitle)) {
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
      </View>
    );
  }

  const renderItem = ({item, drag}) => {
    const isFolder = item.list ? true : false;
    const {isActive} = useOnCellActiveAnimation();
    const styles = barStyles[state.darkMode].barStyle;
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (!isFolder)
                  navigation.navigate('OpenPdf', {pdfTitle: item.title});
                else
                  navigation.navigate('BanisList2', {
                    list: item.list,
                    folderTitle: item.title, //name of the bar clicked on
                  });
              }}
              style={[
                styles.rowItem,
                {
                  backgroundColor: isActive ? 'red' : item.backgroundColor,
                  height: item.height,
                  elevation: isActive ? 30 : 0,
                },
              ]}
              onLongPress={drag}>
              <Animated.View style={styles.itemContainer}>
                {isFolder ? (
                  <Icon
                    style={styles.icons}
                    name="folder-outline"
                    type="ionicon"
                  />
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
              </Animated.View>
              <View style={styles.gap}></View>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };
  // const [placeholderIndex, setPlaceholderIndex] = React.useState(-1);
  // const ref = React.useRef();
  return (
    <View style={styles.container}>
      <DraggableFlatList
        // ref={ref}
        data={baniaList}
        onDragEnd={i => {
          const data = i.data;
          const from = i.from;
          const to = i.to;

          console.log(i);
          const temp = data[from];
          data[from] = data[to];
          data[to] = temp;
          console.log(data);
          setBaniaList(data);
        }}
        keyExtractor={item => item.title}
        renderItem={renderItem}
        // onPlaceholderIndexChange={setPlaceholderIndex}
      />
      <AddFileModal
        state={state}
        visible={modalOn}
        setVisibility={setModal}
        setBaniaList={setBaniaList}
        dispatch={dispatch}
        folderTitle={folderTitle}></AddFileModal>
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
      </TouchableOpacity>
      <View style={styles.gap}></View>
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
  const [folderName, setFolderName] = React.useState();

  const sameFileAlert = () =>
    Alert.alert('File or folder with the Same name already exists!!', [
      {
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
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
        return sameFileAlert();
      }
      dispatch(addNdeletePdf(name, details, true));
      dispatch(setAddedPDFs(folderTitle, {title: name}));
    } catch (err) {
      // alert(err);
      console.log(err);
    }
    setVisibility(false);
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
          style={{backgroundColor: '#cecece', borderRadius: 5}}
          placeholder="exp: Folder 1"
          onChangeText={e => {
            setFolderName(e);
          }}
        />
        <View style={styles.underScroll}>
          <TouchableOpacity
            style={styles.ButtomButton}
            onPress={() => {
              if (state.allPdfs[folderName] || folderName === '') {
                // sameFileAlert();
                return;
              }
              dispatch(
                setAddedPDFs(folderTitle, {title: folderName, list: []}),
              );
              const details = {
                checked: false,
                baniType: folderTitle,
              };
              dispatch(addNdeletePdf(folderName, details, true));
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
