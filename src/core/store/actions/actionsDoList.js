export const addComponentsLi = payload => (dispatch) => {
  dispatch({
    payload,
    type: 'ADD_NEV_COMPONENT',
  });
};

export const changeFilter = payload => (dispatch) => {
  dispatch({
    payload,
    type: 'CHANGE_FILTER',
  });
};
