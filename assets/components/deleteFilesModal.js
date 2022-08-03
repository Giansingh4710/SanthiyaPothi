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
import {allColors} from '../styleForEachOption';

import {addPDForFolder} from '../../redux/actions';

export function DeleteFilesModal({
  state,
  dispatch,
  visible,
  setVisibility,
  fullPath,
  navigation,
}) {
  const sameFileAlert = name => {
    const msg = 'No folder name given. Please Enter a folder name.';
    return Alert.alert('Folder Name left Blank!!!', msg, [
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
      backgroundColor: allColors[state.darkMode].headerColor,
      // backgroundColor: 'blue',
      // height: '50%',
      // backgroundColor: 'rgba(0,0,0,0.5)',
      // height:'100%',
      top: '25%',
      bottom:'50%',
      width: '90%',
      left: '5%',
      borderRadius: 40,
      // position: 'absolute',
    },
    topRow: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      margin: 10,
    },
    title: {
      flex: 3,
      margin: 10,
      fontSize: 18,
      color: state.darkMode ? 'white' : 'black',
    },
    text: {
      color: state.darkMode ? 'white' : 'black',
      fontSize:16,
      // justifyContent:'flex-start'
    },
    icons: {
      flex: 1,
    },
    textInput: {
      backgroundColor: '#cecece',
      borderRadius: 5,
    },
    ButtomButton: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
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
      dispatch(addPDForFolder(name, details, fullPath));
      navigation.goBack();
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
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.icons}
            onPress={() => {
              setVisibility(false);
            }}>
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              size={50}
              color={state.darkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Add a File or Folder :</Text>
        </View>

        <View style={styles.topRow}>
          <Text style={styles.text}>Add a Folder : </Text>
          <TextInput
            style={styles.textInput}
            placeholder="exp: Folder 1"
            onSubmitEditing={e => {
              const folderName = e.nativeEvent.text;
              if (folderName === '') {
                sameFileAlert(folderName);
                return;
              }
              dispatch(addPDForFolder(folderName, {}, fullPath));
              navigation.goBack();
              setVisibility(false);
            }}
          />
        </View>

        <View style={styles.topRow}>
          <Text style={styles.text}>Add a File : </Text>
          <TouchableOpacity
            style={styles.ButtomButton}
            onPress={() => {
              pickDoc();
            }}>
            <Text style={styles.text}>Pick File</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={styles.ButtomButton}
          onPress={() => {
            setVisibility(false);
          }}>
          <Text style={styles.text}>Go Back</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
}

