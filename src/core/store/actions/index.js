export const addComponentsLi = (payload) => dispatch => {
  console.log('........addcomponents.', payload);
  dispatch({
    payload,
    type: 'ADD_NEV_COMPONENT'
  })
};

export const clickElementLi = (payload) => dispatch => {
  dispatch({
    payload,
    type: 'CLICK_ELEMENT_LI'
  });
};

export const changeFilter = (payload) => dispatch => {
  dispatch({
    payload,
    type: 'CHANGE_FILTER'
  });
};
