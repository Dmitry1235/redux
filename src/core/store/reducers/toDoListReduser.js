export default (state = {
  todoList: [{id: 0, text: 'test', isDone: true}, {id: 1, text: 'test2', isDone: false}], filter: "all"}, action) => {
  switch (action.type) {
    case 'ADD_NEV_COMPONENT':
      return {
        ...state,
        todoList: [...state.todoList, {
          id: state.todoList[state.todoList.length - 1].id + 1,
          isDone: false,
          text: action.payload
        }]
      };
    case 'CLICK_ELEMENT_LI':
      const todoList = [...state.todoList];
      const todoItem = todoList.find((item) => item.id === action.payload);
      todoItem.isDone = !todoItem.isDone;

      return {
        ...state,
        todoList
      };
    case 'CHANGE_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state
  }
}
