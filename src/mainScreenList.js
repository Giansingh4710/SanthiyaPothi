import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {setTheState} from '../redux/actions';
import {initialState} from '../redux/reducers';
import {allColors, barStyle, headerColor} from '../assets/styleForEachOption';

function HomeScreen({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  React.useEffect(() => {
    async function getData() {
      try {
        const theStringState = await AsyncStorage.getItem('state');
        let theState;

        if (theStringState) {
          theState = JSON.parse(theStringState);
          // console.log(theState);
          console.log('got state that was previously saved');
        } else {
          console.log('there is nothing is state');
          theState = initialState;
        }
        dispatch(setTheState(theState));
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }
    getData();
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
    });
  });

  const styles = {
    ...allColors[state.darkMode].barStyle,
    container: {
      // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(114,160,193,1)',
      height: '100%',
    },
    scroll: {
      // flex: 1.5,
      width: '100%',
      height: '80%',
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
  };
  return (
    <View style={styles.container}>
      <View style={styles.scroll}>
        <FlatList
          keyExtractor={item => item.title} //name of each item like 'Bai Vaara'
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {
                    navigation.navigate('BanisList', {
                      list: item.listt,
                      fileTitle: item.title, //name of the bar clicked on
                    });
                  }}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Icon
                    style={{flex: 1}}
                    // name="arrow-forward-outline"
                    name="arrow-forward-outline"
                    type="ionicon"
                    // onPress={() => {}}
                  />
                </TouchableOpacity>
                <View style={styles.gap}></View>
              </View>
            );
          }}
          data={[
            {
              title: 'Sri Guru Granth Sahib Jee',
              listt: [
                {title: 'Adi Maharaj.pdf'},
                {title: 'Fareedkot Teeka.pdf'},
              ],
            },
            {
              title: 'Panj Granthi',
              listt: [
                {title: 'Gauri Bavan Akahri.pdf'},
                {title: 'Sukhmani Sahib.pdf'},
                {title: 'Asa Ki Vaar.pdf'},
                {title: 'Dakhni Oankaar.pdf'},
                {title: 'Sidh Gosth.pdf'},
              ],
            },
            {
              title: 'Bai Varra',
              listt: [
                {title: '1) Sri Raag Ki Vaar Mahala 4.pdf'},
                {title: '2) Vaar Maajh Ki Mahala 1.pdf'},
                {title: '3) Goauri Ki Vaar Mahala 4.pdf'},
                {title: '4) Goauri Ki Vaar Mahala 5.pdf'},
                {title: '5) Asa Vaar Mahala 1.pdf'},
                {title: '6) Goojri Ki Vaar Mahala 3.pdf'},
                {title: '7) Goojri Ki Vaar Mahala 5.pdf'},
                {title: '8) Bihagra Ki Vaar Mahala 4.pdf'},
                {title: '9) Vidhans Ki Vaar Mahala 4.pdf'},
                {title: '10) Sorath Ki Vaar Mahala 4.pdf'},
                {title: '11) Jaitsri Ki Vaar Mahala 5.pdf'},
                {title: '12) Soohi KI Vaar Mahala 3.pdf'},
                {title: '13) Bilval Ki Vaar Mahala 4.pdf'},
                {title: '14) Ramkali Ki Vaar Mahala 3.pdf'},
                {title: '15) Ramkali Ki Vaar Mahala 5.pdf'},
                {title: '16) Ramkali Ki Vaar Rai Satta Balvand.pdf'},
                {title: '17) Maroo Ki Vaar - Mahala 3.pdf'},
                {title: '18) Maroo Ki Vaar - Mahala 5 Dakhne.pdf'},
                {title: '19) Basant Ki Vaar Mahala 5.pdf'},
                {title: '20) Sarang Ki Vaar Mahala 4.pdf'},
                {title: '21) Malaar Ki Vaar Mahala 1.pdf'},
                {title: '22) Kanre Ki Vaar Mahala 4.pdf'},
              ],
            },
            {
              title: 'Bhagat Bani',
              listt: [
                {title: '1) Sri raag.pdf'},
                {title: '2) Raag Gaurii.pdf'},
                {title: '3) Raag Asa.pdf'},
                {title: '4) Raag Goojri.pdf'},
                {title: '5) Raag Sorath.pdf'},
                {title: '6) Raag Dhanasri.pdf'},
                {title: '7) Raag Jaatsri.pdf'},
                {title: '8) Raag Todi.pdf'},
                {title: '9) Raag Tilang.pdf'},
                {title: '10) Raag Soohi.pdf'},
                {title: '11) Raag Bilawal.pdf'},
                {title: '12) Raag Goand.pdf'},
                {title: '13) Raag Raamkali.pdf'},
                {title: '14) Raag Mali Goara.pdf'},
                {title: '15) Raag Maroo.pdf'},
                {title: '16) Raag keydara.pdf'},
                {title: '17) Raag Bhaaro.pdf'},
                {title: '18) Raag Basant.pdf'},
                {title: '19) Raag Sarang.pdf'},
                {title: '20) Raag Malaar.pdf'},
                {title: '21) Raag Kaanra.pdf'},
                {title: '22) Raag Parbati.pdf'},
                {title: '23) Salok Bhagat Kabir Jio Ki.pdf'},
                {title: '24) Salok Bhagat Fareed Jee Ki.pdf'},
                //'Bhagat Bani Tatkara.jpeg'
              ],
            },
            {
              title: 'Bhattaa De Swaiye',
              listt: [
                {title: 'Swaiye Sri Mukhvaakea Mahalla 5.pdf'},
                {title: 'Swaiye Sri Mukhvaakea Mahalla 5-2.pdf'},
                {title: 'Swaiye Mahallay Peheley Ky.pdf'},
                {title: 'Swaiye Mahallay Doojey Ky.pdf'},
                {title: 'Swaiye Mahallay Tejey Ky.pdf'},
                {title: 'Swaiye Mahallay Chothey Ky.pdf'},
                {title: 'Swaiye Mahallay Panjvey Ky.pdf'},
              ],
            },
            {
              title: 'Vaara De Vadeek',
              listt: [
                {title: 'Vaara Di Vadeek Mahalla 1.pdf'},
                {title: 'Vaara Di Vadeek Mahalla 3.pdf'},
                {title: 'Vaara Di Vadeek Mahalla 4.pdf'},
                {title: 'Vaara Di Vadeek Mahalla 5.pdf'},
              ],
            },
            {
              title: 'Vidya Sagar Pothis',
              listt: [
                {title: 'Adhyatam_Prakash.pdf'},
                {title: 'Bavras_Amrit.pdf'},
                {title: 'CaNaka_Rajniti.pdf'},
                {title: 'Sarkutavali.pdf'},
                {title: 'Vichar_Mala.pdf'},
                {title: 'Panch_Granthavali.pdf'},
                //'Bhagat Bani Tatkara.jpeg'
              ],
            },
            {
              title: 'Sri Nanak Parkash',
              listt: [
                {title: 'Sri_Nanak_Parkash_1.pdf'},
                {title: 'Sri_Nanak_Parkash_2.pdf'},
                {title: 'Ajit Singh Teeka Pothi 1.pdf'},
              ],
            },
            {
              title: 'ਪਾਠ Hajari',
              listt: Object.entries(state.checkBoxes).filter(bani => {
                return bani[1].currentAng !== 1 && bani[1].checked === false;
              }),
            },
          ]}
        />
      </View>
      <View style={styles.underScroll}>
        <TouchableOpacity
          style={styles.ButtomButton}
          onPress={() => {
            navigation.navigate('Settings Page');
          }}>
          <Text style={styles.shabadtext}>Settings</Text>
          <Icon name="settings-outline" type="ionicon"></Icon>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ButtomButton} onPress={() => {}}>
          <Text style={styles.shabadtext}>Random</Text>
          <Icon name="shuffle-outline" type="ionicon"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
