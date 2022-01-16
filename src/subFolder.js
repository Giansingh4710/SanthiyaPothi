import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CheckBox, Icon} from 'react-native-elements';

import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import {barStyles, allColors} from '../assets/styleForEachOption';
import AddFileModal from '../assets/otherScreens/addFilesModal';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCheckBox,
  deleteAddedItem,
  addNdeletePdf,
  setList,
} from '../redux/actions';

export default function FolderToPdfs2({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const [modalOn, setModal] = React.useState(false);
  const [data, setData] = React.useState(route.params.list);
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

  React.useEffect(() => {
    // setData(state.addedPdfs.list);
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
  }, [navigation.isFocused()]);

  const renderItem = ({item, drag}) => {
    const {isActive} = useOnCellActiveAnimation();
    const styles = barStyles[state.darkMode].barStyle;

    const folderOrFileIcon = (
      <Icon style={styles.icons} name="document-outline" type="ionicon" />
    );

    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('OpenPdf', {pdfTitle: item.title})
              }
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
                {/* {folderOrFileIcon} */}
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
                    // setData(state.addedPdfs.list);
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
          // setData(i.data);
        }}
        keyExtractor={item => item.title}
        renderItem={renderItem}
      />
      <AddFileModal
        state={state}
        visible={modalOn}
        setVisibility={setModal}
        dispatch={dispatch}
        folderTitle={folderTitle}
        onlyFiles={true}></AddFileModal>
    </View>
  );
}
