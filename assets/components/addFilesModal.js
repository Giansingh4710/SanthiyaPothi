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
import DocumentPicker from 'react-native-document-picker';
import {Icon} from 'react-native-elements';

import {addPDForFolder} from '../../redux/actions';

export function AddFileModal({
  state,
  dispatch,
  visible,
  setVisibility,
  fullPath,
  navigation
}) {
  const [folderName, setFolderName] = React.useState('');

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
      position: 'absolute',
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

  async function pickDoc() {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.pdf,
      });
      const name = res[0].name;
      const details = {
        checked: false,
        currentAng: 1,
        uri: res[0].uri,
      };
      if (state.allPdfs[name]) {
        sameFileAlert(name);
        return;
      }
      dispatch(addPDForFolder(name,details,fullPath))
      navigation.goBack()
    } catch (err) {
      // alert(err);
      console.log(err);
    }
    setVisibility(false);
  }

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
            size={50}
            color={state.darkMode ? 'white' : 'black'}
          />
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
                sameFileAlert(folderName);
                setFolderName('');
                return;
              }
              dispatch(addPDForFolder(folderName,{},fullPath))
              navigation.goBack()
              setVisibility(false);
            }}>
            <Text>Add a FOLDER</Text>
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
