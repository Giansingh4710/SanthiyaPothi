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

export function ShabadModal({}) {
  const [folderName, setFolderName] = React.useState('');

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
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {
        setVisibility(false);
      }}>
      <View style={styles.container}></View>
    </Modal>
  );
}
