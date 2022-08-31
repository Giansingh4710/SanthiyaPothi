//temporary for build version 3 update
export const correctVaaraTeVadeek = () => dispatch => {
  dispatch({
    type: 'CORRECT_FROM_DE_TO_TE',
  });
};

//--------------------------------
export const setCheckBox = (baniTitle, fullPath) => dispatch => {
  dispatch({
    type: 'SET_CHECKBOX',
    theBani: baniTitle,
    fullPath,
  });
};
export const setTheState = state => dispatch => {
  dispatch({
    type: 'SET_THE_STATE',
    state,
  });
};
export const setAngNum = (fullPath, baniTitle, angNum) => dispatch => {
  dispatch({
    type: 'SET_ANG_NUM',
    fullPath,
    theBani: baniTitle,
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

export const addPDForFolder = (key,value,fullPath) => dispatch => {
  dispatch({
    type: 'ADD_PDF_OR_FOLDER',
    key,
    value,
    fullPath,
  });
};
export const deletePDForFolder = (key,fullPath) => dispatch => {
  dispatch({
    type: 'DELETE_PDF_OR_FOLDER',
    key,
    fullPath,
  });
};



//--------------------------------
export const setFontSize = fontSize => dispatch => {
  dispatch({
    type: 'SET_FONT_SIZE',
    fontSize,
  });
};
export const addToShabadHistory = shabadObj => dispatch => {
  dispatch({
    type: 'ADD_TO_SHABAD_HISTORY',
    shabadObj,
  });
};
export const clearHistory = () => dispatch => {
  dispatch({
    type: 'CLEAR_HISTORY',
  });
};
export const toggleSaveForShabad = (index) => dispatch => {
  dispatch({
    type: 'TOGGLE_SAVE_FOR_SHABAD',
    index,
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
