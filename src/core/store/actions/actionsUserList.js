export const  addNewUser = (payload) => dispatch =>{
    dispatch({
      payload,
      type: 'SUCCESS_LOGIN'
    });
};