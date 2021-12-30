import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';

import Pdf from 'react-native-pdf';
import TeekaPDF from './teekaPdf';
import {useSelector, useDispatch} from 'react-redux';
import {setAngNum, setCheckBox} from '../redux/actions';

export default function OpenPdf({navigation, route}) {
  const [totalAngs, setTotalAngs] = React.useState(0);
  const [currrentAng, setCurrentAng] = React.useState(1);
  const [inputAng, setInputAng] = React.useState('');
  const [orientation, setOrientation] = React.useState('portrait');

  const currentAngRef = React.useRef(1); //only for addListner
  const totalAngRef = React.useRef(1); //only for addListner

  const state = useSelector(theState => theState.theReducer);
  const dispatch = useDispatch();

  const {pdfTitle} = route.params;

  // const isPortrait = () => {
  //   const dim = Dimensions.get('screen');
  //   return dim.height >= dim.width;
  // };

  // Dimensions.addEventListener('change', () => {
  //   setOrientation(isPortrait() ? 'portrait' : 'landscape');
  //   // console.log('changed orientation');
  //   console.log(this.pdf._reactInternals.memoizedProps);
  // });

  React.useEffect(() => {
    this.pdf.setPage(state.checkBoxes[pdfTitle].currentAng);
  }, [totalAngs]);

  React.useEffect(() => {
    navigation.setOptions({
      title: pdfTitle,
      // headerTitle: () => <Text>{pdfTitle}</Text>,
    });

    navigation.addListener('beforeRemove', () => {
      dispatch(setAngNum(pdfTitle, currentAngRef.current));
      // console.log(currentAngRef.current, totalAngRef.current);
      if (currentAngRef.current === totalAngRef.current) {
        if (state.checkBoxes[pdfTitle].checked === false) {
          dispatch(setCheckBox(pdfTitle));
        }
      }
    });
  }, [navigation]);

  const allPdfs = {
    '1)SriRaagKiVaarMahala4.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/1)SriRaagKiVaarMahala4.pdf',
    },
    '10)SorathKiVaarMahala4.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/10)SorathKiVaarMahala4.pdf',
    },
    '11)JaitsriKiVaarMahala5.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/11)JaitsriKiVaarMahala5.pdf',
    },
    '12)SoohiKIVaarMahala3.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/12)SoohiKIVaarMahala3.pdf',
    },
    '13)BilvalKiVaarMahala4.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/13)BilvalKiVaarMahala4.pdf',
    },
    '14)RamkaliKiVaarMahala3.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/14)RamkaliKiVaarMahala3.pdf',
    },
    '15)RamkaliKiVaarMahala5.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/15)RamkaliKiVaarMahala5.pdf',
    },
    '16)RamkaliKiVaarRaiSattaBalvand.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/16)RamkaliKiVaarRaiSattaBalvand.pdf',
    },
    '17)MarooKiVaar-Mahala3.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/17)MarooKiVaar-Mahala3.pdf',
    },
    '18)MarooKiVaar-Mahala5Dakhne.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/18)MarooKiVaar-Mahala5Dakhne.pdf',
    },
    '19)BasantKiVaarMahala5.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/19)BasantKiVaarMahala5.pdf',
    },
    '2)VaarMaajhKiMahala1.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/2)VaarMaajhKiMahala1.pdf',
    },
    '20)SarangKiVaarMahala4.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/20)SarangKiVaarMahala4.pdf',
    },
    '21)MalaarKiVaarMahala1.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/21)MalaarKiVaarMahala1.pdf',
    },
    '22)KanreKiVaarMahala4.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/22)KanreKiVaarMahala4.pdf',
    },
    '22VaaraTatkara.jpeg': {
      uri: 'bundle-assets://pdfs/BaiVarra/22VaaraTatkara.jpeg',
    },
    '3)GoauriKiVaarMahala4.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/3)GoauriKiVaarMahala4.pdf',
    },
    '4)GoauriKiVaarMahala5.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/4)GoauriKiVaarMahala5.pdf',
    },
    '5)AsaVaarMahala1.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/5)AsaVaarMahala1.pdf',
    },
    '6)GoojriKiVaarMahala3.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/6)GoojriKiVaarMahala3.pdf',
    },
    '7)GoojriKiVaarMahala5.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/7)GoojriKiVaarMahala5.pdf',
    },
    '8)BihagraKiVaarMahala4.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/8)BihagraKiVaarMahala4.pdf',
    },
    '9)VidhansKiVaarMahala4.pdf': {
      uri: 'bundle-assets://pdfs/BaiVarra/9)VidhansKiVaarMahala4.pdf',
    },
    '1)Sriraag.pdf': {uri: 'bundle-assets://pdfs/BhagatBani/1)Sriraag.pdf'},
    '10)RaagSoohi.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/10)RaagSoohi.pdf',
    },
    '11)RaagBilawal.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/11)RaagBilawal.pdf',
    },
    '12)RaagGoand.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/12)RaagGoand.pdf',
    },
    '13)RaagRaamkali.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/13)RaagRaamkali.pdf',
    },
    '14)RaagMaliGoara.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/14)RaagMaliGoara.pdf',
    },
    '15)RaagMaroo.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/15)RaagMaroo.pdf',
    },
    '16)Raagkeydara.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/16)Raagkeydara.pdf',
    },
    '17)RaagBhaaro.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/17)RaagBhaaro.pdf',
    },
    '18)RaagBasant.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/18)RaagBasant.pdf',
    },
    '19)RaagSarang.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/19)RaagSarang.pdf',
    },
    '2)RaagGaurii.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/2)RaagGaurii.pdf',
    },
    '20)RaagMalaar.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/20)RaagMalaar.pdf',
    },
    '21)RaagKaanra.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/21)RaagKaanra.pdf',
    },
    '22)RaagParbati.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/22)RaagParbati.pdf',
    },
    '23)SalokBhagatKabirJioKi.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/23)SalokBhagatKabirJioKi.pdf',
    },
    '24)SalokBhagatFareedJeeKi.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/24)SalokBhagatFareedJeeKi.pdf',
    },
    '3)RaagAsa.pdf': {uri: 'bundle-assets://pdfs/BhagatBani/3)RaagAsa.pdf'},
    '4)RaagGoojri.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/4)RaagGoojri.pdf',
    },
    '5)RaagSorath.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/5)RaagSorath.pdf',
    },
    '6)RaagDhanasri.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/6)RaagDhanasri.pdf',
    },
    '7)RaagJaatsri.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/7)RaagJaatsri.pdf',
    },
    '8)RaagTodi.pdf': {uri: 'bundle-assets://pdfs/BhagatBani/8)RaagTodi.pdf'},
    '9)RaagTilang.pdf': {
      uri: 'bundle-assets://pdfs/BhagatBani/9)RaagTilang.pdf',
    },
    'AdiMaharaj.pdf': {
      uri: 'bundle-assets://pdfs/SriGuruGranthSahibJee/AdiMaharaj.pdf',
    },
    'AdiMaharajTyped.pdf': {
      uri: 'bundle-assets://pdfs/SriGuruGranthSahibJee/AdiMaharajTyped.pdf',
    },
    'FareedkotTeeka.pdf': {
      uri: 'bundle-assets://pdfs/SriGuruGranthSahibJee/FareedkotTeeka.pdf',
    },
    'Panch_Granthavali.pdf': {
      uri: 'bundle-assets://pdfs/VidyaSagarPothis/Panch_Granthavali.pdf',
    },
    'Adhyatam_Prakash.pdf': {
      uri: 'bundle-assets://pdfs/VidyaSagarPothis/Adhyatam_Prakash.pdf',
    },
    'Bavras_Amrit.pdf': {
      uri: 'bundle-assets://pdfs/VidyaSagarPothis/Bavras_Amrit.pdf',
    },
    'CaNaka_Rajniti.pdf': {
      uri: 'bundle-assets://pdfs/VidyaSagarPothis/CaNaka_Rajniti.pdf',
    },
    'Sarkutavali.pdf': {
      uri: 'bundle-assets://pdfs/VidyaSagarPothis/Sarkutavali.pdf',
    },
    'Vichar_Mala.pdf': {
      uri: 'bundle-assets://pdfs/VidyaSagarPothis/Vichar_Mala.pdf',
    },
    'Sri_Nanak_Parkash_1.pdf': {
      uri: 'bundle-assets://pdfs/SriNanakParkash/Sri_Nanak_Parkash_1.pdf',
    },
    'Sri_Nanak_Parkash_2.pdf': {
      uri: 'bundle-assets://pdfs/SriNanakParkash/Sri_Nanak_Parkash_2.pdf',
    },
    'AjitSinghTeekaPothi1.pdf': {
      uri: 'bundle-assets://pdfs/SriNanakParkash/AjitSinghTeekaPothi1.pdf',
    },
    'GauriBavanAkahri.pdf': {
      uri: 'bundle-assets://pdfs/PanjGranthi/GauriBavanAkahri.pdf',
    },
    'SukhmaniSahib.pdf': {
      uri: 'bundle-assets://pdfs/PanjGranthi/SukhmaniSahib.pdf',
    },
    'AsaKiVaar.pdf': {
      uri: 'bundle-assets://pdfs/PanjGranthi/AsaKiVaar.pdf',
    },
    'DakhniOankaar.pdf': {
      uri: 'bundle-assets://pdfs/PanjGranthi/DakhniOankaar.pdf',
    },
    'SidhGosth.pdf': {
      uri: 'bundle-assets://pdfs/PanjGranthi/SidhGosth.pdf',
    },
    'SwaiyeSriMukhvaakeaMahalla5.pdf': {
      uri: 'bundle-assets://pdfs/BhattaaDeSwaiye/SwaiyeSriMukhvaakeaMahalla5.pdf',
    },
    'SwaiyeSriMukhvaakeaMahalla5-2.pdf': {
      uri: 'bundle-assets://pdfs/BhattaaDeSwaiye/SwaiyeSriMukhvaakeaMahalla5-2.pdf',
    },
    'SwaiyeMahallayPeheleyKy.pdf': {
      uri: 'bundle-assets://pdfs/BhattaaDeSwaiye/SwaiyeMahallayPeheleyKy.pdf',
    },
    'SwaiyeMahallayDoojeyKy.pdf': {
      uri: 'bundle-assets://pdfs/BhattaaDeSwaiye/SwaiyeMahallayDoojeyKy.pdf',
    },
    'SwaiyeMahallayTejeyKy.pdf': {
      uri: 'bundle-assets://pdfs/BhattaaDeSwaiye/SwaiyeMahallayTejeyKy.pdf',
    },
    'SwaiyeMahallayChotheyKy.pdf': {
      uri: 'bundle-assets://pdfs/BhattaaDeSwaiye/SwaiyeMahallayChotheyKy.pdf',
    },
    'SwaiyeMahallayPanjveyKy.pdf': {
      uri: 'bundle-assets://pdfs/BhattaaDeSwaiye/SwaiyeMahallayPanjveyKy.pdf',
    },
    'VaaraDiVadeekMahalla1.pdf': {
      uri: 'bundle-assets://pdfs/VaaraDeVadeek/VaaraDiVadeekMahalla1.pdf',
    },
    'VaaraDiVadeekMahalla3.pdf': {
      uri: 'bundle-assets://pdfs/VaaraDeVadeek/VaaraDiVadeekMahalla3.pdf',
    },
    'VaaraDiVadeekMahalla4.pdf': {
      uri: 'bundle-assets://pdfs/VaaraDeVadeek/VaaraDiVadeekMahalla4.pdf',
    },
    'VaaraDiVadeekMahalla5.pdf': {
      uri: 'bundle-assets://pdfs/VaaraDeVadeek/VaaraDiVadeekMahalla5.pdf',
    },
  };

  const fileName = pdfTitle.split(' ').join(''); //replaces " " with ""
  const sourceFileName = allPdfs[fileName];

  if (fileName === 'FareedkotTeeka.pdf') {
    return <TeekaPDF navigation={navigation} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.angInfoRow}>
        <View style={styles.pagesBox}>
          <Text style={styles.boxText}>
            {currrentAng}/{totalAngs}
          </Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputEntryBox}
            value={inputAng}
            placeholder="ex: 5"
            onChangeText={text => {
              if (text.length < 5) {
                setInputAng(text);
              }
            }}
          />
          <TouchableOpacity
            style={styles.inputSubmit}
            onPress={() => {
              const asInt = parseInt(inputAng);
              if (asInt) {
                this.pdf.setPage(asInt);
                if (asInt > totalAngs) {
                  setInputAng(String(totalAngs));
                }
              }
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.inputSubmit}
            onPress={() => {
              this.pdf.setPage(state.checkBoxes[pdfTitle].currentAng);
            }}>
            <Text>Go To Ang Last Left On</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <Pdf
        ref={pdf => {
          this.pdf = pdf;
        }}
        activityIndicator={<ActivityIndicator size="large" color="blue" />}
        source={sourceFileName}
        onLoadComplete={(numberOfPages, filePath) => {
          setTotalAngs(numberOfPages);
          totalAngRef.current = numberOfPages;
        }}
        onPageChanged={(page, numberOfPages) => {
          setCurrentAng(page);
          currentAngRef.current = page;
        }}
        onError={error => {
          Alert.alert(
            'PDF ERROR',
            String(error),
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          );
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#7CB9E8',
//   },
//   header: {
//     flexDirection: 'row',
//     padding: 5,
//   },
//   backButton: {
//     flex: 1,
//   },
//   backArrow: {
//     width: 30,
//     height: 30,
//   },
//   title: {
//     fontSize: 10,
//     // backgroundColor: 'yellow',
//     // flex: 4,
//     // right: 25,
//     // textAlign: 'center',
//   },
//   angInfoRow: {
//     flexDirection: 'row',
//   },
//   pagesBox: {
//     height: 30,
//     width: 150,
//     borderRadius: 5,
//     backgroundColor: 'white',
//     alignItems: 'center',
//   },
//   boxText: {
//     fontSize: 20,
//   },
//   inputRow: {
//     flex: 1,
//     justifyContent: 'space-evenly',
//     flexDirection: 'row',
//     // backgroundColor: 'white',
//   },
//   inputEntryBox: {
//     height: 45,
//     width: 60,
//     backgroundColor: '#A3C1AD',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontSize: 19,
//     borderRadius: 5,
//     // padding: 10,
//   },
//   inputSubmit: {
//     backgroundColor: '#00CED1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 40,
//     width: 50,
//     borderRadius: 10,
//   },
//   lastLeftOn: {
//     backgroundColor: '#00CED1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 40,
//     width: 90,
//     borderRadius: 10,
//   },
//   pdf: {
//     // width: Dimensions.get('window').width,
//     width: '100%',
//     // height: Dimensions.get('window').height,
//     height: '80%',
//     borderRadius: 25,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CB9E8',
  },
  // header: {
  //   flexDirection: 'row',
  //   paddingBottom: 10,
  // },
  // backButton: {
  //   flex: 1,
  // },
  // backArrow: {
  //   width: 30,
  //   height: 30,
  // },
  // title: {
  //   fontSize: 15,
  //   flex: 4,
  //   right: 25,
  //   textAlign: 'center',
  // },
  angInfoRow: {
    flexDirection: 'row',
  },
  pagesBox: {
    height: '55%',
    width: '30%',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 20,
  },
  inputRow: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // backgroundColor: 'white',
  },
  inputEntryBox: {
    height: '100%',
    width: '20%',
    backgroundColor: '#A3C1AD',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 19,
    borderRadius: 5,
    // padding: 10,
  },
  inputSubmit: {
    backgroundColor: '#00CED1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 90,
    borderRadius: 10,
  },
  pdf: {
    // width: Dimensions.get('window').width,
    width: '100%',
    // height: Dimensions.get('window').height,
    height: '89%',
    borderRadius: 25,
  },
});
