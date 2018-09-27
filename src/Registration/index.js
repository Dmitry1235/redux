import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import FormLabel from '../components/FormLabel';
import Button from '../components/Button';
import {addUser, addUserAsync} from '../core/api/index';

import './styles.css';


class Registration extends Component {
  constructor() {
    super();
    this.state = {
      lastName: {
        value: 'qweqwe',
        error: false,
      },
      firstName: {
        value: 'qweqwe',
        error: false,
      },
      phoneNumber: {
        value: '12345',
        error: false,
      },
      password: {
        value: 'qweqwe',
        error: false,
      },
      confirmPassword: {
        value: 'qweqwe',
        error: false,
      },
    };
  }

  checkValidation() {
    const newState = { ...this.state };
    let result = true;
    if (!newState.lastName.value || newState.lastName.value.trim().length < 3
      || !newState.lastName.value.trim().match(/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)) {
      newState.lastName.error = true;
      result = false;
    }
    if (!newState.firstName.value || newState.firstName.value.trim().length < 3
      || !newState.firstName.value.trim().match(/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)) {
      newState.firstName.error = true;
      result = false;
    }
    if (!newState.phoneNumber.value || newState.phoneNumber.value.trim().length < 5
      || !newState.phoneNumber.value.trim().match(/\d{1,}/g)) {
      newState.phoneNumber.error = true;
      result = false;
    }
    if (!newState.password.value || newState.password.value.trim().length < 3
      || newState.password.value.trim() !== newState.confirmPassword.value.trim()) {
      newState.password.error = true;
      result = false;
    }
    if (!newState.confirmPassword.value || newState.confirmPassword.value.trim().length < 3
      || newState.confirmPassword.value.trim() !== newState.password.value.trim()) {
      newState.confirmPassword.error = true;
      result = false;
    }

    this.setState(newState);
    if (result) {
      return this.addToLocalStorige();
    }
  }

  handleChangeInput(value, fieldName) {
    this.setState({ [fieldName]: { value, error: false } });
  }

  addToLocalStorige() {
    const objectLocalStorage = {
      lastName: this.state.lastName.value,
      firstName: this.state.firstName.value,
      phoneNumber: this.state.phoneNumber.value,
      password: this.state.password.value,
    };

    objectLocalStorage.password = sha256(objectLocalStorage.password);

    addUserAsync(objectLocalStorage)
      .then((data) => {
        console.log(data)
      })

    /*
    addUserCallback(objectLocalStorage, () => {
      console.log('ssssssssssssssssss')
    }, () => {
      console.log('eeeeeeerrrrroooot')
    });
    */

    // addUser(objectLocalStorage, (data) => {
    //   console.log(12345, data);
    // })
    //   .catch((e) => {
    //     console.log('..............e',e )
    //   })



    // if (!mongoDB.addUser(objectLocalStorage)) {
    //   this.setState({numberPhone: {value: objectLocalStorage.phoneNumber, error: true}});
    // } else {
    //   alert('Are you registered ');
    //   this.props.history.push('/entry');
    // }
  }

  render() {
    const { lastName, firstName, phoneNumber, password, confirmPassword } = this.state;
    console.log('......State)........', this.state);
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="Registration col-4">
            <h3>Create an account</h3>
            <FormLabel
              labelText="First name"
              inputType="text"
              inputClass={`${firstName.error === true ? 'Red form-control' : 'form-control'}`}
              inputValue={firstName.value}
              inputOnChange={e => this.handleChangeInput(e.target.value, 'firstName', /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)}
            />

            <FormLabel
              labelText="Last name"
              inputType="text"
              inputClass={`${lastName.error === true ? 'Red form-control' : 'form-control'}`}
              inputValue={lastName.value}
              inputOnChange={e => this.handleChangeInput(e.target.value, 'lastName', /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)}
            />

            <FormLabel
              labelText="Number phone"
              inputType="text"
              inputClass={`${phoneNumber.error === true ? 'Red form-control' : 'form-control'}`}
              inputValue={phoneNumber.value}
              inputOnChange={e => this.handleChangeInput(e.target.value, 'phoneNumber', /\d{1,}/g)}
            />

            <FormLabel
              labelText="Enter password"
              inputType="password"
              inputClass={`${this.state.password.error === true ? 'Red form-control' : 'form-control'}`}
              inputValue={password.value}
              inputOnChange={e => this.handleChangeInput(e.target.value, 'password')}
            />

            <FormLabel
              labelText="Confirm password"
              inputType="password"
              inputClass={`${this.state.confirmPassword.error === true ? 'Red form-control' : 'form-control'}`}
              inputValue={confirmPassword.value}
              inputOnChange={e => this.handleChangeInput(e.target.value, 'confirmPassword')}
            />
            <hr />
            <Button
              className="btn btn-secondary col-6"
              click={() => this.props.history.push('/entry')}
              text="Cancel"
            />
            <Button className="btn btn-primary  col-6" click={() => this.checkValidation()} text="Sign Up" />
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;









/*
      .then((resp) => resp.json())
     .then((resp) => {
       if (resp.ok) {
         return resp;
       } else {
         console.log('..............', resp)
         throw new Error(resp.errmsg);
       }
     })
     .then((data) => {
       console.log('..............', data)
     })
     .catch((error) => {
       console.log('catch', [error]);
     });
     */