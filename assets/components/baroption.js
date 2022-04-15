import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, useWindowDimensions} from 'react-native';

export function BarOption({left, text, right, onClick, onLongPress, state}) {
    const { WIDTH }=useWindowDimensions();

    const styles = StyleSheet.create({
        itemContainer: {
            height: 75,
            padding: 5,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: state.darkMode ? '#04293A' : '#ACDDDE',
            width:WIDTH,
        },
        iconsInBar: {
            //flex: 1,
            //backgroundColor:'red',
            padding: 10,
        },
        titleText: {
            flex: 4,
            fontSize: 15,
            padding: 5,
            left: 12,
            color: state.darkMode ? 'white' : 'black',
        },
        gap: {
            height: 2,
        },
    });
    return (
        <View>
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onClick()}
                onLongPress={onLongPress}>
                <View style={styles.iconsInBar}>{left}</View>
                <Text style={styles.titleText}>{text}</Text>
                <View style={styles.iconsInBar}>{right}</View>
            </TouchableOpacity>
            <View style={styles.gap} />
        </View>
    );
}
