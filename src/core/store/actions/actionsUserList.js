export const  addNewUser = (payload) => dispatch => {
    console.log('.....payload......',payload);
    dispatch({
      payload,
      type: 'SUCCESS_LOGIN'
    })
};