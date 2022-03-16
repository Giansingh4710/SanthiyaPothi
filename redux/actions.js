export const setCheckBox = baniTitle => dispatch => {
  dispatch({
    type: 'SET_CHECKBOX',
    theBani: baniTitle,
  });
};
export const setTheState = state => dispatch => {
  dispatch({
    type: 'SET_THE_STATE',
    state,
  });
};
export const setAngNum = (bani, angNum) => dispatch => {
  dispatch({
    type: 'SET_ANG_NUM',
    bani,
    angNum,
  });
};
export const setDarkMode = mode => dispatch => {
  dispatch({
    type: 'SET_DARK_MODE',
    mode,
  });
};
export const setHideHeader = mode => dispatch => {
  dispatch({
    type: 'SET_HIDE_HEADER',
    mode,
  });
};
export const setShowHeader = mode => dispatch => {
  dispatch({
    type: 'SET_SHOW_HEADER',
    mode,
  });
};
export const addFileOrFolder = (folderTitle, item) => dispatch => {
  dispatch({
    type: 'ADD_FILE_OR_FOLDER',
    item,
    folderTitle,
  });
};
export const deleteAddedItem = title => dispatch => {
  dispatch({
    type: 'DELETE_ADDED_ITEM',
    title,
  });
};
export const addNdeletePdf = (title, item, toAdd) => dispatch => {
  dispatch({
    type: 'ADD_OR_DELETE_PDF',
    title,
    item,
    add: toAdd, //boolean
  });
};
export const setList = (listTitle, theList) => dispatch => {
  dispatch({
    type: 'SET_LIST_IN_ADDED_PDFS',
    listTitle,
    theList,
  });
};
// export const setTheState = state => {
//   return {
//     type: 'SET_THE_STATE',
//     state,
//   };
// };
// export const setCheckBox = baniTitle => {
//   return {
//     type: 'SET_CHECKBOX',
//     theBani: baniTitle,
//   };
// };
