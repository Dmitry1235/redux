export default (state = {user: null, isLogin: false}, action) => {
  switch (action.type) {
    case "SUCCESS_LOGIN":
      return{
        ...state,
        user: [...state.user, {
          lastName: action.lastName.value,
          firstName: action.firstName.value,
          numberPhone: action.numberPhone.value,
          password: action.password.value
        }]
      };
  }
  return state
}
