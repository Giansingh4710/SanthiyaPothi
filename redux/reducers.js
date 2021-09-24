import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async (title, state) => {
  try {
    await AsyncStorage.setItem(title, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};

const uniqueId = shabadList => {
  const lst = shabadList.map(shabad => shabad.id); //the list of ids of shabads

  let theId = Math.floor(Math.random() * 99999999999) + 1;
  let duplicate = lst.filter(anId => anId === theId);

  while (duplicate.length > 0) {
    theId = Math.floor(Math.random() * 99999999999) + 1;
    duplicate = lst.filter(anId => anId === theId);
  }
  return theId;
};

export const initialState = {
  checkBoxes: {
    'Adi Maharaj.pdf': {
      checked: false,
      baniType: 'Sri Guru Granth Sahib Jee',
      currentAng: 1,
    },
    'Fareedkot Teeka.pdf': {
      checked: false,
      baniType: 'Sri Guru Granth Sahib Jee',
      currentAng: 1,
    },
    '1) Sri Raag Ki Vaar Mahala 4.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '2) Vaar Maajh Ki Mahala 1.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '3) Goauri Ki Vaar Mahala 4.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '4) Goauri Ki Vaar Mahala 5.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '5) Asa Vaar Mahala 1.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '6) Goojri Ki Vaar Mahala 3.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '7) Goojri Ki Vaar Mahala 5.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '8) Bihagra Ki Vaar Mahala 4.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '9) Vidhans Ki Vaar Mahala 4.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '10) Sorath Ki Vaar Mahala 4.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '11) Jaitsri Ki Vaar Mahala 5.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '12) Soohi KI Vaar Mahala 3.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '13) Bilval Ki Vaar Mahala 4.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '14) Ramkali Ki Vaar Mahala 3.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '15) Ramkali Ki Vaar Mahala 5.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '16) Ramkali Ki Vaar Rai Satta Balvand.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '17) Maroo Ki Vaar - Mahala 3.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '18) Maroo Ki Vaar - Mahala 5 Dakhne.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '19) Basant Ki Vaar Mahala 5.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '20) Sarang Ki Vaar Mahala 4.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '21) Malaar Ki Vaar Mahala 1.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '22) Kanre Ki Vaar Mahala 4.pdf': {
      checked: false,
      baniType: 'Bai Varra',
      currentAng: 1,
    },
    '1) Sri raag.pdf': {checked: false, baniType: 'Bhagat Bani', currentAng: 1},
    '2) Raag Gaurii.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '3) Raag Asa.pdf': {checked: false, baniType: 'Bhagat Bani', currentAng: 1},
    '4) Raag Goojri.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '5) Raag Sorath.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '6) Raag Dhanasri.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '7) Raag Jaatsri.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '8) Raag Todi.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '9) Raag Tilang.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '10) Raag Soohi.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '11) Raag Bilawal.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '12) Raag Goand.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '13) Raag Raamkali.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '14) Raag Mali Goara.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '15) Raag Maroo.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '16) Raag keydara.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '17) Raag Bhaaro.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '18) Raag Basant.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '19) Raag Sarang.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '20) Raag Malaar.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '21) Raag Kaanra.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '22) Raag Parbati.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '23) Salok Bhagat Kabir Jio Ki.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    '24) Salok Bhagat Fareed Jee Ki.pdf': {
      checked: false,
      baniType: 'Bhagat Bani',
      currentAng: 1,
    },
    'Panch_Granthavali.pdf': {
      checked: false,
      baniType: 'Vidya Sagar Pothis',
      currentAng: 1,
    },
    'Adhyatam_Prakash.pdf': {
      checked: false,
      baniType: 'Vidya Sagar Pothis',
      currentAng: 1,
    },
    'Bavras_Amrit.pdf': {
      checked: false,
      baniType: 'Vidya Sagar Pothis',
      currentAng: 1,
    },
    'CaNaka_Rajniti.pdf': {
      checked: false,
      baniType: 'Vidya Sagar Pothis',
      currentAng: 1,
    },
    'Sarkutavali.pdf': {
      checked: false,
      baniType: 'Vidya Sagar Pothis',
      currentAng: 1,
    },
    'Vichar_Mala.pdf': {
      checked: false,
      baniType: 'Vidya Sagar Pothis',
      currentAng: 1,
    },
    'Sri_Nanak_Parkash_1.pdf': {
      checked: false,
      baniType: 'Sri Nanak Parkash',
      currentAng: 1,
    },
    'Sri_Nanak_Parkash_2.pdf': {
      checked: false,
      baniType: 'Sri Nanak Parkash',
      currentAng: 1,
    },
    'Ajit Singh Teeka Pothi 1.pdf': {
      checked: false,
      baniType: 'Sri Nanak Parkash',
      currentAng: 1,
    },
    'Gauri Bavan Akahri.pdf': {
      checked: false,
      baniType: 'Panj Granthi',
      currentAng: 1,
    },
    'Sukhmani Sahib.pdf': {
      checked: false,
      baniType: 'Panj Granthi',
      currentAng: 1,
    },
    'Asa Ki Vaar.pdf': {
      checked: false,
      baniType: 'Panj Granthi',
      currentAng: 1,
    },
    'Dakhni Oankaar.pdf': {
      checked: false,
      baniType: 'Panj Granthi',
      currentAng: 1,
    },
    'Sidh Gosth.pdf': {
      checked: false,
      baniType: 'Panj Granthi',
      currentAng: 1,
    },
    'Swaiye Sri Mukhvaakea Mahalla 5.pdf': {
      checked: false,
      baniType: 'Bhattaa De Swaiye',
      currentAng: 1,
    },
    'Swaiye Sri Mukhvaakea Mahalla 5-2.pdf': {
      checked: false,
      baniType: 'Bhattaa De Swaiye',
      currentAng: 1,
    },
    'Swaiye Mahallay Peheley Ky.pdf': {
      checked: false,
      baniType: 'Bhattaa De Swaiye',
      currentAng: 1,
    },
    'Swaiye Mahallay Doojey Ky.pdf': {
      checked: false,
      baniType: 'Bhattaa De Swaiye',
      currentAng: 1,
    },
    'Swaiye Mahallay Tejey Ky.pdf': {
      checked: false,
      baniType: 'Bhattaa De Swaiye',
      currentAng: 1,
    },
    'Swaiye Mahallay Chothey Ky.pdf': {
      checked: false,
      baniType: 'Bhattaa De Swaiye',
      currentAng: 1,
    },
    'Swaiye Mahallay Panjvey Ky.pdf': {
      checked: false,
      baniType: 'Bhattaa De Swaiye',
      currentAng: 1,
    },
    'Vaara Di Vadeek Mahalla 1.pdf': {
      checked: false,
      baniType: 'Vaara De Vadeek',
      currentAng: 1,
    },
    'Vaara Di Vadeek Mahalla 3.pdf': {
      checked: false,
      baniType: 'Vaara De Vadeek',
      currentAng: 1,
    },
    'Vaara Di Vadeek Mahalla 4.pdf': {
      checked: false,
      baniType: 'Vaara De Vadeek',
      currentAng: 1,
    },
    'Vaara Di Vadeek Mahalla 5.pdf': {
      checked: false,
      baniType: 'Vaara De Vadeek',
      currentAng: 1,
    },
  },
  shabadModalShown: false,
  shabadShabadListModalShown: false,
  theShabad: {
    text: 'Vaheguru',
    date: 'today',
    id: '1',
    time: 'right now',
    pinned: false,
    index: null,
  },
  shabadList: [],
};

setData('state', initialState); //to reset all state

//why does the app chash when I change the prarameters position
function theReducer(state = initialState, action) {
  if (action.type === 'SET_CHECKBOX') {
    const newCheckBoxes = {...state.checkBoxes};
    newCheckBoxes[action.theBani].checked =
      !newCheckBoxes[action.theBani].checked;
    // console.log(action.theBani, newCheckBoxes[action.theBani]);

    const newState = {
      ...state,
      checkBoxes: newCheckBoxes,
    };

    setData('state', newState);
    return newState;
  }
  // for async storage
  if (action.type === 'SET_THE_STATE') {
    const newState = {
      ...action.state,
    };

    setData('state', newState);
    return newState;
  }

  if (action.type === 'UN_CHECK_BOXES') {
    let newCheckBoxes = {};
    const arrayCheckBoxes = Object.entries(state.checkBoxes);
    arrayCheckBoxes.map(item => {
      if (item[1].baniType === action.baniType) {
        item[1].checked = false;
      }
      newCheckBoxes[item[0]] = item[1];
    });

    const newState = {
      ...state,
      checkBoxes: newCheckBoxes,
    };

    setData('state', newState);
    return newState;
  }

  if (action.type === 'SHABAD_MODAL') {
    const newState = {
      ...state,
      shabadModalShown: !state.shabadModalShown,
    };

    setData('state', newState);
    return newState;
  }

  if (action.type === 'SET_HISTORY_MODAL') {
    const newState = {
      ...state,
      shabadShabadListModalShown: !state.shabadShabadListModalShown,
    };

    setData('state', newState);
    return newState;
  }

  if (action.type === 'SET_SHABAD') {
    const theNewShabad = {
      text: action.theShabadText,
      date: action.date,
      time: action.time,
      id: action.id === '0' ? uniqueId(state.shabadList) : action.id,
      pinned: action.saved,
      index: action.index,
    };

    const newState = {
      ...state,
      theShabad: theNewShabad,
    };

    if (action.addToList === true) {
      newState.shabadList = [theNewShabad, ...state.shabadList];
    }

    setData('state', newState);
    return newState;
  }

  if (action.type === 'SET_SAVED_SHABAD') {
    const newSavedShabad = state.theShabad;
    const newShabadList = state.shabadList;

    for (const aShabad of newShabadList) {
      if (aShabad.id === action.id) {
        const newAns = !aShabad.pinned;
        aShabad.pinned = newAns;
        newSavedShabad.pinned = newAns;
      }
    }
    // console.log(newSavedShabad.pinned);

    // newSavedShabad.pinned = !newSavedShabad.pinned;
    // newShabadList[newSavedShabad.index].pinned = newSavedShabad.pinned;

    const newState = {
      ...state,
      shabadList: newShabadList,
      theShabad: newSavedShabad,
    };
    setData('state', newState);
    return newState;
  }

  if (action.type === 'DELETE_SHABAD') {
    const newState = {
      ...state,
      shabadList: state.shabadList.filter(shabad => shabad.id !== action.id),
    };

    setData('state', newState);
    return newState;
  }

  if (action.type === 'SET_ANG_NUM') {
    const newCurrentAngBani = state.checkBoxes[action.bani];
    newCurrentAngBani.currentAng = action.angNum;

    const newCheckBoxes = state.checkBoxes;
    newCheckBoxes[action.bani] = newCurrentAngBani;

    const newState = {
      ...state,
      checkBoxes: newCheckBoxes,
    };

    setData('state', newState);
    return newState;
  }

  return state;
}

export default theReducer;
