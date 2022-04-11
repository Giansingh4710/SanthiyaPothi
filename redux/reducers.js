import AsyncStorage from '@react-native-async-storage/async-storage';
import {folderToFileData} from '../assets/longData';

export const setData = async (title, state) => {
  try {
    await AsyncStorage.setItem(title, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};

export const initialState = {
  darkMode: true,
  hideHeaderOnScroll: true,
  showHeaderOnScroll: true,
  allPdfs: {...folderToFileData},
  fontSizeForShabad: 16,
  //addedPdfs: {title: 'Added PDFs', list: []},
  shabadHistory:[{shabadId:'1YU',saved:false}],
};

setData('state', initialState); //to reset all state

function theReducer(state = initialState, action) {
  let theState;
  if (action.type === 'SET_THE_STATE') {
    const newState = {
      ...action.state,
    };
    theState = newState;
  } else if (action.type === 'SET_CHECKBOX') {
    const newallPdfs = {...state.allPdfs};
    newallPdfs[action.theFolder][action.theBani].checked =
      !newallPdfs[action.theFolder][action.theBani].checked;
    const newState = {
      ...state,
      allPdfs: newallPdfs,
    };
    theState = newState;
  } else if (action.type === 'SET_ANG_NUM') {
    state.allPdfs[action.folder][action.bani].currentAng = action.angNum;
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
  } else if (action.type === 'SET_HIDE_HEADER') {
    const newState = {
      ...state,
      hideHeaderOnScroll: action.mode,
    };
    theState = newState;
  } else if (action.type === 'SET_SHOW_HEADER') {
    const newState = {
      ...state,
      showHeaderOnScroll: action.mode,
    };
    theState = newState;
  } else if (action.type === 'ADD_URI') {
    state.allPdfs[action.folder][action.file].uris.unshift(action.uri);
    theState = state;
    console.log(theState.allPdfs[action.folder][action.file]);
  } else if (action.type === 'REMOVE_URI') {
    if (state.allPdfs[action.folder][action.file].uris.length > 1)
      state.allPdfs[action.folder][action.file].uris.shift();
    theState = state;
    console.log(theState.allPdfs[action.folder][action.file]);
  } else if (action.type === 'SET_FONT_SIZE') {
    state.fontSizeForShabad = action.fontSize;
    theState = state;
  } else if (action.type === 'ADD_FILE_OR_FOLDER') {
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
  } else if (action.type === 'SET_LIST_IN_ADDED_PDFS') {
    const listTitle = action.listTitle;
    const theList = action.theList;

    if (state.addedPdfs.title === listTitle) state.addedPdfs.list = theList;
    else {
      for (let i = 0; i < state.addedPdfs.list.length; i++) {
        if (state.addedPdfs.list[i].title === listTitle) {
          state.addedPdfs.list[i].list = theList;
          break;
        }
      }
    }
    theState = state;
  } else if (action.type === 'ADD_TO_SHABAD_HISTORY') {
    state.shabadHistory.push(action.shabadObj)
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
