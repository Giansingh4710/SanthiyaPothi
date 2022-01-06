import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkBoxes} from '../assets/longData';

const setData = async (title, state) => {
  try {
    await AsyncStorage.setItem(title, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};

export const initialState = {
  darkMode: false,
  checkBoxes: {...checkBoxes},
};

setData('state', initialState); //to reset all state

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
