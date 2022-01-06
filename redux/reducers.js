import AsyncStorage from '@react-native-async-storage/async-storage';
import {allPdfs} from '../assets/longData';

export const setData = async (title, state) => {
  try {
    await AsyncStorage.setItem(title, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};

export const initialState = {
  darkMode: false,
  allPdfs: {...allPdfs},
};

// setData('state', initialState); //to reset all state

function theReducer(state = initialState, action) {
  // for async storage
  if (action.type === 'SET_THE_STATE') {
    const newState = {
      ...action.state,
    };

    setData('state', newState);
    return newState;
  }
  if (action.type === 'SET_CHECKBOX') {
    const newallPdfs = {...state.allPdfs};
    newallPdfs[action.theBani].checked = !newallPdfs[action.theBani].checked;
    const newState = {
      ...state,
      allPdfs: newallPdfs,
    };

    setData('state', newState);
    return newState;
  }

  if (action.type === 'SET_ANG_NUM') {
    state.allPdfs[action.bani].currentAng = action.angNum;
    const newState = {
      ...state,
    };

    setData('state', newState);
    return newState;
  }

  if (action.type === 'SET_DARK_MODE') {
    const newState = {
      ...state,
      darkMode: action.mode,
    };
    setData('state', newState);
    return newState;
  }
  return state;
}

export default theReducer;
