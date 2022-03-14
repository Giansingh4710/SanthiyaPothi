import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';

import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import {allColors} from '../assets/styleForEachOption';
import AddFileModal from '../assets/components/addFilesModal';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCheckBox,
  deleteAddedItem,
  addNdeletePdf,
  setList,
} from '../redux/actions';
import {RightOfHeader} from '../assets/components/rightOfHeader.js';
import {BarOption} from '../assets/components/baroption';

export default function FolderToPdfs2({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const [modalOn, setModal] = React.useState(false);
  const [data, setData] = React.useState(route.params.list);
  const folderTitle = route.params.folderTitle;

  let folderInd = 0; //index of folder in state.addedPdfs.list
  React.useEffect(() => {
    for (let i = 0; i < state.addedPdfs.list.length; i++) {
      if (state.addedPdfs.list[i].title == folderTitle) {
        folderInd = i;
        break;
      }
    }
  }, []);

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
    setData(state.addedPdfs.list[folderInd].list);
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      headerTitle: () => <Text>{folderTitle}</Text>,
      headerRight: () => (
        <RightOfHeader
          state={state}
          icons={[
            {
              name: 'add-outline',
              action: () => setModal(true),
            },
            {
              name: 'shuffle-outline',
              action: () => {},
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
  }, [navigation.isFocused()]);

  const renderItem = ({item, drag}) => {
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <Animated.View>
              <BarOption
                state={state}
                onLongPress={drag}
                left={
                  <Icon
                    name={'document-outline'}
                    type="ionicon"
                    color={state.darkMode ? 'white' : 'black'}
                  />
                }
                text={item.title}
                right={
                  <Icon
                    color={state.darkMode ? 'white' : 'black'}
                    name="trash-outline"
                    type="ionicon"
                    onPress={() => {
                      dispatch(deleteAddedItem(item.title));
                      dispatch(addNdeletePdf(item.title, '_', false));
                      setData(state.addedPdfs.list[folderInd].list);
                    }}
                  />
                }
                onClick={() => {
                  navigation.navigate('OpenPdf', {
                    pdfTitle: item.title,
                  });
                }}
              />
            </Animated.View>
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
          dispatch(setList(folderTitle, i.data));
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
        folderTitle={folderTitle}
        onlyFiles={true}></AddFileModal>
    </View>
  );
}
