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
    // this.pdf.setPage(state.checkBoxes[pdfTitle].currentAng);
  }, [totalAngs]);

  React.useEffect(() => {
    const headerStyles = StyleSheet.create({
      container: {
        // backgroundColor: 'orange',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      title: {
        flex: 1,
        // backgroundColor: 'blue',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10,
        justifyContent: 'center',
        textAlign: 'center',
      },
      pagesBox: {
        flex: 1,
        margin: 10,
        width: '30%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // justifyContent: 'space-evenly',
        fontSize: 20,
        flexDirection: 'row',
        backgroundColor: '#077b8a',
      },
      setAngNumBox: {
        borderRadius: 5,
        height: '95%',
        fontSize: 20,
        backgroundColor: '#a2d5c6',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
      boxText: {
        fontSize: 25,
      },
    });

    function LogoTitle(props) {
      return (
        <View style={headerStyles.container}>
          <Text style={headerStyles.title}>{props['title']}</Text>
          <View style={headerStyles.pagesBox}>
            <TextInput
              keyboardType="numeric"
              value={currrentAng.toString()}
              style={headerStyles.setAngNumBox}
              placeholder="ex: 5"
              onSubmitEditing={e => {
                const asInt = currrentAng;
                if (asInt) {
                  // this.pdf.setPage(asInt);
                  if (asInt > totalAngs) {
                    setCurrentAng(totalAngs);
                  }
                }
              }}
              onChangeText={text => {
                if (text.length === 0) {
                  setCurrentAng('');
                } else if (text.length < 5) {
                  setCurrentAng(parseInt(text));
                }
              }}
            />
            <Text style={headerStyles.boxText}>/{totalAngs}</Text>
          </View>
        </View>
      );
    }

    navigation.setOptions({
      headerTitle: () => <LogoTitle title={pdfTitle} />,
    });
  });

  React.useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      dispatch(setAngNum(pdfTitle, currentAngRef.current));
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
      <Pdf
        ref={pdf => {
          // this.pdf = pdf;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CB9E8',
  },
  pdf: {
    width: '100%',
    height: '99%',
    borderRadius: 15,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
});
