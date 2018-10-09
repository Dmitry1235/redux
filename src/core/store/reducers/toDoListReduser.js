export default (state = { User: { lastName: '', firstName: '', phoneNumber: '' } }, action) => {

  switch (action.type) {
    case 'ADD_NEV_COMPONENT':
      return {
        ...state,
        User: {
          lastName: action.payload.data[0].lastName,
          firstName: action.payload.data[0].firstName,
          phoneNumber: action.payload.data[0].phoneNumber,
        },
      };
    case 'CHANGE_FILTER':
      return {
        ...state,
        User: { lastName: '', firstName: '', phoneNumber: '' },
      };
    default:
      return state;
  }
};
