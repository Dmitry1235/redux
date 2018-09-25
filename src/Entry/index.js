import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sha256 } from 'js-sha256';
import { addNewUser } from '../core/store/actions/actionsUserList';
import FormLabel from '../components/FormLabel';
import Button from '../components/Button';

import './style.css';

class Entry extends Component {
  constructor() {
    super();
    this.state = {
      numberPhone: {
        value: '',
        error: false,
      },
      password: {
        value: '',
        error: false,
      },
    };
  }

  handleChangeInput(value, fieldName) {
    value ? this.setState({ [fieldName]: { value, error: false } }) : this.setState({ [fieldName]: { value, error: true } });
  }

  entryUser(numberPhone, password) {
    const arrayStorage = JSON.parse(localStorage.getItem('user'));
    for (const num in arrayStorage) {
      if (arrayStorage[num].phoneNumber === numberPhone && arrayStorage[num].password === sha256(password)) {
        this.props.history.push('/home');
        return this.props.entryUser(arrayStorage[num].firstName);
      }
    }
    return this.setState({ numberPhone: { value: '', error: true }, password: { value: '', error: true } });
  }

  render() {
    const { numberPhone, password } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-4" />
          <div className="Entry col-4">
            <label> Please Sign In</label>
            <FormLabel
              labelText="Number phone"
              inputType="text"
              inputClass={`${numberPhone.error === true ? 'Red form-control' : 'form-control'}`}
              inputValue={numberPhone.value}
              inputOnChange={e => this.handleChangeInput(e.target.value, 'numberPhone')}
            />
            <FormLabel
              labelText="Password"
              inputType="password"
              inputClass={`${password.error === true ? 'Red form-control' : 'form-control'}`}
              inputValue={password.value}
              inputOnChange={e => this.handleChangeInput(e.target.value, 'password')}
            />
            <hr />
            <Button
              className="btn btn-success col-6"
              click={() => this.props.history.push('/registration')}
              text="Registration"
            />
            <Button
              className="btn btn-primary col-6"
              click={() => this.entryUser(numberPhone.value, password.value)}
              text="Log In"
            />
          </div>
          <div className="col-4" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  entryUser: text => dispatch(addNewUser(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
