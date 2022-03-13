import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

export function BarOption({left, text, right, onClick}) {
  const styles = StyleSheet.create({
    itemContainer: {
      height: 75,
      padding: 5,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ACDDDE',
    },
    iconsInBar: {
      //flex: 1,
      padding: 10,
      //backgroundColor:'red'
    },
    titleText: {
      flex: 4,
      fontSize: 15,
      padding: 5,
      left: 12,
    },
    gap: {
      height: 2,
    },
  });
  return (
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={() => onClick()}>
        <View style={styles.iconsInBar}>{left}</View>
        <Text style={styles.titleText}>{text}</Text>
        <View style={styles.iconsInBar}>{right}</View>
      </TouchableOpacity>
      <View style={styles.gap} />
    </View>
  );
}
