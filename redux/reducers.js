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
    // console.log(theFolderToPutIn, theFile);
    const res = dfsPutInFolder(state.addedPdfs, theFolderToPutIn, theFile);
    // console.log(res);
    if (res !== false) {
      state.addedPdfs = res;
    }
    theState = state;
  } else if (action.type === 'DELETE_ADDED_ITEM') {
    const fileToDel = action.title;
    const res = dfsDelInFolder(state.addedPdfs, fileToDel);
    // console.log(res);
    if (res !== false) {
      state.addedPdfs = res;
    }
    theState = state;
  } else if (action.type === 'ADD_OR_DELETE_PDF') {
    const fileName = action.title;
    const details = action.item;
    const add = action.add; //boolean
    if (add) {
      state.allPdfs[fileName] = details;
    } else {
      delete state.allPdfs[fileName];
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

function dfsDelInFolder(addedPdfs, fileToDel) {
  if (!addedPdfs.list) {
    return false;
  }

  const theLst = addedPdfs.list;
  for (let i = 0; i < theLst.length; i++) {
    if (theLst[i].title === fileToDel) {
      const newArr = remove(theLst, fileToDel);
      addedPdfs.list = newArr;
      return addedPdfs;
    }
  }
  for (let i = 0; i < theLst.length; i++) {
    if (theLst[i].list) {
      const newObj = dfsDelInFolder(theLst[i], fileToDel);
      if (newObj !== false) {
        addedPdfs.list[i] = newObj;
        return addedPdfs;
      }
    }
  }
  return false;
}
function remove(arr, file) {
  const ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === file) continue;
    ans.push(arr[i]);
  }
  return ans;
}
export default theReducer;
