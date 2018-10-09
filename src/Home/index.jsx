import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComponentsLi } from '../core/store/actions/actionsDoList';
import Button from '../components/Button/index';
import { addItemList, findNumberPhoneList, updateItemIsDone } from '../core/api/index';

import './App.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      list: [],
      filter: 'all',
      error: false,
    };
  }

  componentDidMount() {
    if (sessionStorage.length !== 0) {
      const objectStore = JSON.parse(sessionStorage.getItem('User'));
      this.arrayListFunction({ phoneNumber: objectStore.phoneNumber }, objectStore.token);
      this.props.add(objectStore.User);

    }else{
      this.props.history.push('/entry');
    }
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value, error: false });
  }

  clickButton(inputValue) {
    !inputValue ? this.setState({ error: true }) : this.addItemInDB(inputValue);
  }

  EnterKeyDown(e, inputValue) {
    e.keyCode === 13 && this.clickButton(inputValue);
  }

  addItemInDB(value) { // Добавление данных в бд
    const objectStore = JSON.parse(sessionStorage.getItem('User'));
    const list = {
      phoneNumber: objectStore.phoneNumber,
      id: 0,
      text: value,
      isDone: false,
    };

    findNumberPhoneList({ phoneNumber: objectStore.phoneNumber }, objectStore.token)
      .then((data) => {
        if (data.length === 0) {
          addItemList(list, objectStore.token).then((fact) => {
            this.setState(...this.state.list.push({
              id: fact.id,
              text: fact.text,
              isDone: fact.isDone,
            }), { inputValue: '' });
          });
        } else {
          list.id = data[0].toDoList.length;
          addItemList(list, objectStore.token).then((fact) => {
            this.setState(...this.state.list.push({
              id: fact.id,
              text: fact.text,
              isDone: fact.isDone,
            }), { inputValue: '' });
          });
        }
      });
  }

  arrayListFunction() { // Вывод данных из бд
    const objectStore = JSON.parse(sessionStorage.getItem('User'));
    findNumberPhoneList({ phoneNumber: objectStore.phoneNumber }, objectStore.token)
      .then((data) => {
        if (data && data[0] && data[0].toDoList) {
          this.setState({ list: data[0].toDoList, inputValue: '' });
        }
      });
  }

  clickItemsText(id) { // Изменения состояния isDone
    const objectStore = JSON.parse(sessionStorage.getItem('User'));
    const objectItem = this.state.list.find(item => item.id === id);

    const stateList = this.state.list;
    stateList[id].isDone = !stateList[id].isDone;
    this.setState({ list: stateList });
    updateItemIsDone({
      phoneNumber: objectStore.phoneNumber,
      id: objectItem.id,
      isDone: objectItem.isDone,
    }, objectStore.token);
  }

  checkURL(){
    if (this.props.history.location.pathname !== '/') {
      this.props.history.push('/');
    }
  }

  render() {
    const {
      inputValue,
      list,
      error,
      filter,
    } = this.state;
    const viewTodoList = list.filter(listItem => filter === 'all' || (filter === 'done') === listItem.isDone);
    this.checkURL();

    return (
          <div className="container-flued">
            <div className="row">
              <div className="App col-9 col-xl-3 col-lg-4 col-md-5 col-sm-6">
                <div className="input-group">
                  <input
                    className={`${error ? 'col-9 Red' : 'col-9'}`}
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
                <br />
                <div className="classUlLi">
                  <ul className="list-group">
                    {viewTodoList.map(item => (
                      <li
                        className={`list-group-item liClass ${item.isDone ? 'doneClass' : 'notDone'}`}
                        key={item.id}
                        onClick={() => this.clickItemsText(item.id)}
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr />
                <div className="btn-group btn-block">
                  <Button
                    className="btn btn-outline-secondary col"
                    text="View all"
                    click={() => this.setState({ filter: 'all' })}
                  />
                  <Button
                    className="btn btn-outline-secondary col"
                    text="View done"
                    click={() => this.setState({ filter: 'done' })}
                  />
                  <Button
                    className="btn btn-outline-secondary col"
                    text="View not done"
                    click={() => this.setState({ filter: 'not done' })}
                  />
                </div>
              </div>
            </div>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  User: state.toDoListReduser.User,
});

const mapDispatchToProps = dispatch => ({
  add: text => dispatch(addComponentsLi(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);


Home.propTypes = {
  add: PropTypes.func,
  User: PropTypes.object,
};
