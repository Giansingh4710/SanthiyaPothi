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
  addedPdfs: {title: 'Added PDFs', list: []},
};

// setData('state', initialState); //to reset all state

function theReducer(state = initialState, action) {
  let theState;
  if (action.type === 'SET_THE_STATE') {
    const newState = {
      ...action.state,
    };
    theState = newState;
  } else if (action.type === 'SET_CHECKBOX') {
    const newallPdfs = {...state.allPdfs};
    newallPdfs[action.theBani].checked = !newallPdfs[action.theBani].checked;
    const newState = {
      ...state,
      allPdfs: newallPdfs,
    };
    theState = newState;
  } else if (action.type === 'SET_ANG_NUM') {
    state.allPdfs[action.bani].currentAng = action.angNum;
    const newState = {
      ...state,
    };
    theState = newState;
  } else if (action.type === 'SET_DARK_MODE') {
    const newState = {
      ...state,
      darkMode: action.mode,
    };
    theState = newState;
  } else if (action.type === 'SET_ADDED_PDFS') {
    const theFolderToPutIn = action.folderTitle;
    const theFile = action.item;
    console.log(theFolderToPutIn, theFile);
    const res = dfsPutInFolder(state.addedPdfs, theFolderToPutIn, theFile);
    console.log(res);
    if (res !== false) {
      state.addedPdfs = res;
    }
    theState = state;
  } else {
    return state;
  }
  setData('state', theState);
  return theState;
}

function dfsPutInFolder(addedPdfs, folderToAdd, file) {
  //this func will modify
  //addedPdfs={title: 'Added PDFs', list: []} in beggining
  //addedPdfs={title: 'Added PDFs', list: [{title: 'bobs', list: []} ]} in beggining

  if (!addedPdfs.list) {
    return false;
  }

  if (addedPdfs.title == folderToAdd) {
    addedPdfs.list.push(file);
    return addedPdfs;
  } else {
    const theLst = addedPdfs.list;
    for (let i = 0; i < theLst.length; i++) {
      const newAddedPdfs = dfsPutInFolder(theLst[i], folderToAdd, file);
      if (newAddedPdfs !== false) {
        addedPdfs.list[i] = newAddedPdfs;
        return addedPdfs;
      }
    }
  }
  return false;
}
export default theReducer;
