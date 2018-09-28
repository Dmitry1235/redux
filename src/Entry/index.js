import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sha256 } from 'js-sha256';
import { addNewUser } from '../core/store/actions/actionsUserList';
import FormLabel from '../components/FormLabel';
import Button from '../components/Button';
import { login } from '../core/api/index'
import './style.css';

class Entry extends Component {
  constructor() {
    super();
    this.state = {
      numberPhone: {
        value: '12345',
        error: false,
      },
      password: {
        value: '123',
        error: false,
      },
    };
  }

  handleChangeInput(value, fieldName) {
    value ? this.setState({[fieldName]: {value, error: false}}) : this.setState({[fieldName]: {value, error: true}});
  }

  entryUser(numberPhone, password) {
    const objectUser = {
      phoneNumber: numberPhone,
      password: sha256(password),
    };

    login(objectUser)
      .then((data) => {
        if (data.length !== 0) {
          this.props.entryUser(data[0].phoneNumber);
          this.props.history.push('/home');
        } else {
          return this.setState({
            numberPhone: {value: this.state.numberPhone.value, error: true},
            password: {value: '', error: true}
          });
        }
      });
  }

  render() {
    const { numberPhone, password } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="Entry col-4">
            <h3> Please Sign In</h3>
            <FormLabel
              labelText="Number phone"
              inputType="text"
              inputClass='form-control'
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
            <small>{ password.error ? "Invalid number or password" : "" }</small>
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
