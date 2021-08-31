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
export const setShabad = () => dispatch => {
  dispatch({
    type: 'SET_SHABAD',
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
