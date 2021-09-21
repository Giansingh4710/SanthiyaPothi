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
export const unCheckBoxes = folderTitle => dispatch => {
  dispatch({
    type: 'UN_CHECK_BOXES',
    baniType: folderTitle,
  });
};
export const setShabadModal = () => dispatch => {
  dispatch({
    type: 'SHABAD_MODAL',
  });
};
export const setShabadHistoryModal = () => dispatch => {
  dispatch({
    type: 'SET_HISTORY_MODAL',
  });
};
export const setShabad =
  (theShabad, date, time, addToList, id, saved) => dispatch => {
    dispatch({
      type: 'SET_SHABAD',
      theShabadText: theShabad,
      date,
      time,
      addToList,
      id,
      saved,
    });
  };
export const deleteShabad = id => dispatch => {
  dispatch({
    type: 'DELETE_SHABAD',
    id,
  });
};
export const setSavedShabad = id => dispatch => {
  dispatch({
    type: 'SET_SAVED_SHABAD',
    id,
  });
};
export const setAngNum = (bani, angNum) => dispatch => {
  dispatch({
    type: 'SET_ANG_NUM',
    bani,
    angNum,
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
