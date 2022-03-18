import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';

import {addFileOrFolder, addNdeletePdf} from '../../redux/actions';

export default function AddFileModal({visible,setVisibility}) {
  const sameFileAlert = name => {
    const msg =
      name === ''
        ? 'Black name for folder not allowed.'
        : `You already have a folder or file named: "${name}"`;
    return Alert.alert('Invalid name for a folder or file!!', msg, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

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
          <Icon
            name="close-outline"
            type="ionicon"
            color={state.darkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <View style={styles.underScroll}>
          {addFolderBtn}
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
