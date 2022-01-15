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
import {barStyles} from '../assets/styleForEachOption';

const NUM_ITEMS = 5;

function getData(numItems) {
  return [...Array(numItems)].map((d, index) => {
    // console.log(barStyles[false].barStyle);
    return {
      key: `item-${index}`,
      label: `${index}`,
      // height: 100,
      // width: 60 + Math.random() * 40,
      // backgroundColor,
      ...barStyles[false].barStyle.itemContainer,
    };
  });
}

export default function FolderToPdfs2() {
  const [data, setData] = useState(getData(NUM_ITEMS));
  const [placeholderIndex, setPlaceholderIndex] = useState(-1);
  const ref = useRef();

  const renderItem = ({item, drag}) => {
    const {isActive} = useOnCellActiveAnimation();
    const styles = barStyles[false].barStyle;
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                console.log('Pressed');
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
              <Animated.View style={{}}>
                <View style={styles.itemContainer}>
                  <Text style={styles.titleText}>{item.label}</Text>
                  <Icon
                    style={styles.icons}
                    name="trash-outline"
                    type="ionicon"
                    onPress={() => {
                      console.log('trash');
                    }}
                  />
                </View>
                <View style={styles.gap}></View>
              </Animated.View>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };
  // console.log('theData', data[0]);
  return (
    <DraggableFlatList
      // ref={ref}
      data={data}
      onDragEnd={i => setData(i.data)}
      keyExtractor={item => item.key}
      renderItem={renderItem}
      // onPlaceholderIndexChange={setPlaceholderIndex}
      renderPlaceholder={({item, index}) => (
        <View style={{flex: 1, backgroundColor: 'blue'}}>
          <Text
            style={[
              styles.rowItem,
              styles.text,
            ]}>{`placeholder: index: ${placeholderIndex}`}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
