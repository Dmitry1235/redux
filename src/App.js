import React, {Component, Fragment} from 'react';
import './App.css';
import {addComponentsLi, changeFilter, clickElementLi} from './core/store/actions'
import Button from './components/Button';

import {connect} from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ""
    }
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  clickButton(inputValue) {
    this.props.add(inputValue);
    this.setState({inputValue: ""});
  };

  render() {
    const {todoList, filter, clickElementLi, change} = this.props;
    const {inputValue} = this.state;
    const viewTodoList = todoList.filter(todoList => filter === 'all' || (filter === 'done') === todoList.isDone);

    return (
      <div className="App">
        <div className="input-group-prepend">
          <input className='input-group' type="text" value={inputValue} onChange={(e) => this.handleChange(e)}/>
          <div className='<input-group-text'>
            <Button className={'btn btn-outline-secondary'} click={() => this.clickButton(inputValue)} text={"Add"}/>
          </div>
        </div>
        <div>
          <ul>{viewTodoList.map((item) => <li className={`liClass ${item.isDone && 'doneClass'}`} key={item.id}
                                              onClick={() => clickElementLi(item.id)}>{item.text}</li>)}</ul>
        </div>
        <div>
          <Button text={"View all"} click={() => change('all')}/>
          <Button text={"View done"} click={() => change('done')}/>
          <Button text={"View not done"} click={() => change('not done')}/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  todoList: state.toDoListReduser.todoList,
  filter: state.toDoListReduser.filter
});

const mapDispatchToProps = dispatch => ({
  add: (text) => dispatch(addComponentsLi(text)),
  clickElementLi: (id) => dispatch(clickElementLi(id)),
  change: (filter) => dispatch(changeFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
