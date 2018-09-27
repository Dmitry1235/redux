import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComponentsLi, changeFilter, clickElementLi } from '../core/store/actions/actionsDoList';
import Button from '../components/Button';
import Li from '../components/Li';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  clickButton(inputValue) {
    inputValue ? this.props.add(inputValue) : alert('fill in the field');
    this.setState({ inputValue: '' });
  }

  EnterKeyDown(e, inputValue) {
    e.keyCode === 13 && this.clickButton(inputValue);// TODO разбей все на компоненты
  }

  render() {
    const {
      todoList, filter, clickElementLi, change,
    } = this.props;
    const { inputValue } = this.state;
    const viewTodoList = todoList.filter(todoList => filter === 'all' || (filter === 'done') === todoList.isDone);

    console.log('..............', this.props);

    return (
      <div className="container-flued">
        <div className="row justify-content-end">
          <Button className="col-1 btn btn-outline-secondary btn-exit" text="Exit" click={() => this.props.history.push('/entry')}/>
        </div>
        <div className="row justify-content-center">
          <div className="col-3 App">
            <div className="input-group">
              <input
                className="col-9"
                type="text"
                value={inputValue}
                onChange={e => this.handleChange(e)}
                onKeyDown={e => this.EnterKeyDown(e, inputValue)}
              />
              <div className="input-group-append col-3">
                <Button
                  className="btn btn-outline-secondary col-12"
                  click={() => this.clickButton(inputValue)}
                  text="Add"
                />
              </div>
            </div>
            <br/>
            <div className="classUlLi">
              <ul className="list-group">{viewTodoList.map(item => <Li className={item.isDone} key={item.id} click={() => clickElementLi(item.id)} text={item.text}/>)}</ul>
            </div>
            <hr/>
            <div className="btn-group btn-block">
              <Button className="btn btn-outline-secondary col" text="View all" click={() => change('all')}/>
              <Button className="btn btn-outline-secondary col" text="View done" click={() => change('done')}/>
              <Button className="btn btn-outline-secondary col" text="View not done" click={() => change('not done')}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoList: state.toDoListReduser.todoList,
  filter: state.toDoListReduser.filter,

  user: state.userListReduser.user,
  isLogin: state.userListReduser.isLogin,
});

const mapDispatchToProps = dispatch => ({
  add: text => dispatch(addComponentsLi(text)),
  clickElementLi: id => dispatch(clickElementLi(id)),
  change: filter => dispatch(changeFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
