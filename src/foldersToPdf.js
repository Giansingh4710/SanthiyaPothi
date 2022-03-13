import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';

import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';

import {useSelector, useDispatch} from 'react-redux';
import {
  setCheckBox,
  deleteAddedItem,
  addNdeletePdf,
  setList,
} from '../redux/actions';
import {barStyles, allColors} from '../assets/styleForEachOption';
import {BarOption} from '../assets/components/baroption';
import {RightOfHeader} from '../assets/components/rightOfHeader.js';
import AddFileModal from '../assets/components/addFilesModal';

export default function FolderToPdfs({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const folderTitle = route.params.folderTitle;
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

  if (folderTitle === 'Added PDFs')
    return (
      <ForAddedPdfsScreen
        state={state}
        dispatch={dispatch}
        navigation={navigation}
        styles={styles}
      />
    );

  const [baniaList, setBaniaList] = React.useState(route.params.list);
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
        <RightOfHeader
          icons={[
            {
              name: 'open-outline',
              action: () => {
                console.log('shabad are');
              },
            },
            {
              name: 'shuffle-outline',
              action: () => {
                const items = baniaList;
                const randItem =
                  items[Math.floor(Math.random() * items.length)];
                navigation.navigate('OpenPdf', {
                  pdfTitle: randItem.title,
                });
              },
            },
            {
              name: 'settings-outline',
              action: () => {
                navigation.navigate('Settings Page');
              },
            },
          ]}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          //item={"title": "11) Jaitsri Ki Vaar Mahala 5.pdf"}
          return (
            <BarOption
              left={
                <Icon
                  style={styles.icons}
                  name="document-outline"
                  type="ionicon"
                />
              }
              text={item.title}
              right={
                <CheckBox
                  checked={state.allPdfs[item.title].checked}
                  checkedColor="#0F0"
                  checkedTitle="ਸੰਪੂਰਨ"
                  containerStyle={{
                    borderRadius: 10,
                    //padding: 10,
                    backgroundColor: 'black',
                  }}
                  onPress={() => {
                    dispatch(setCheckBox(item.title));
                  }}
                  //size={20}
                  textStyle={{
                    fontSize: 10,
                    height: 20,
                    color: 'white',
                  }}
                  title="Not Done"
                  titleProps={{}}
                  uncheckedColor="#F00"
                />
              }
              onClick={() => {
                navigation.navigate('OpenPdf', {
                  pdfTitle: item.title,
                });
              }}
            />
          );
        }}
        data={baniaList}
      />
    </View>
  );
}

function ForAddedPdfsScreen({state, dispatch, navigation, styles}) {
  const [modalOn, setModal] = React.useState(false);
  const [data, setData] = React.useState(state.addedPdfs.list);

  console.log(data);

  React.useEffect(() => {
    //setData(state.addedPdfs.list);
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerTitle: () => <Text>Added PDFs</Text>,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerBtns}
            onPress={() => {
              setModal(true);
            }}>
            <Icon name="add-outline" type="ionicon"></Icon>
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
  });

  const renderItem = ({item, drag}) => {
    const isFolder = item.list ? true : false;
    const {isActive} = useOnCellActiveAnimation();
    const styles = barStyles[state.darkMode].barStyle;

    const folderOrFileIcon = isFolder ? (
      <Icon style={styles.icons} name="folder-outline" type="ionicon" />
    ) : (
      <Icon style={styles.icons} name="document-outline" type="ionicon" />
    );
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (!isFolder)
                  navigation.navigate('OpenPdf', {
                    pdfTitle: item.title,
                  });
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
                  elevation: isActive ? 1 : 0,
                },
              ]}
              onLongPress={drag}>
              <Animated.View style={styles.itemContainer}>
                {folderOrFileIcon}
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
                <Icon
                  style={styles.icons}
                  name="trash-outline"
                  type="ionicon"
                  onPress={() => {
                    dispatch(deleteAddedItem(item.title));
                    dispatch(addNdeletePdf(item.title, '_', false));
                    setData(state.addedPdfs.list);
                    // const lstInFld = item.list;
                    if (item.list)
                      item.list.map(i => {
                        dispatch(deleteAddedItem(i.title));
                        dispatch(addNdeletePdf(i.title, '_', false));
                      });
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

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={data}
        onDragEnd={i => {
          dispatch(setList('Added PDFs', i.data));
          setData(i.data);
        }}
        keyExtractor={item => item.title}
        renderItem={renderItem}
      />
      <AddFileModal
        state={state}
        visible={modalOn}
        setVisibility={setModal}
        dispatch={dispatch}
        folderTitle={'Added PDFs'}
        onlyFiles={false}></AddFileModal>
    </View>
  );
}
