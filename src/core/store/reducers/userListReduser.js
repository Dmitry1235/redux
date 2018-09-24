export default (state = {user: null, isLogin: false}, action) => {
  switch (action.type) {
    case "SUCCESS_LOGIN":
      return{
        ...state,
        user: action.payload,
        isLogin: true
      };
    default:
      return state
  }
}
