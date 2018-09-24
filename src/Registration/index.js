import React, {Component} from "react";
import './styles.css';
import {withRouter} from 'react-router';
import {sha256} from 'js-sha256';
import FormLabel from '../components/Form_label';
import Button from '../components/Button';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      lastName: {
        value: '',
        error: false
      },
      firstName: {
        value: '',
        error: false
      },
      phoneNumber: {
        value: '',
        error: false
      },
      password: {
        value: '',
        error: false
      },
      confirmPassword: {
        value: '',
        error: false
      }
    }
  }

  handleChangeInput(value, fieldName, regext) {
    value.match(regext) !== null ? this.setState({
      [fieldName]: {
        value,
        error: false
      }
    }) : this.setState({[fieldName]: {value, error: true}});
  }

  handlerChangeNumberPhone(value, fieldName, regext) {
    value.match(regext) !== null && this.validTolocalNumberPhone(value) ? this.setState({
      [fieldName]: {
        value,
        error: false
      }
    }) : this.setState({[fieldName]: {value, error: true}});
  }

  validTolocalNumberPhone(value) {
    const storigeNumber = JSON.parse(localStorage.getItem('user'))
    for (let num in storigeNumber) {
      if (storigeNumber[num].phoneNumber.value === value) {
        return false;
      }
    }
    return true;
  }

  validConfirmPassword(value) {
    value === this.state.password.value ?
      this.setState({
        password: {value: this.state.password.value, error: false},
        confirmPassword: {value, error: false}
      }) :
      this.setState({
        password: {value: this.state.password.value, error: true},
        confirmPassword: {value, error: true}
      });
  }

  validPassword(value) {
    value === this.state.confirmPassword.value ?
      this.setState({
        password: {value, error: false},
        confirmPassword: {value: this.state.confirmPassword.value, error: false}
      }) :
      this.setState({
        password: {value, error: true},
        confirmPassword: {value: this.state.confirmPassword.value, error: true}
      });
  }

  addToLocalStorige() {
    const arrayState = this.state;
    arrayState.password.value = sha256(arrayState.password.value);
    arrayState.confirmPassword.value = sha256(arrayState.confirmPassword.value);
    alert('Are you registered ');

    if (localStorage.length === 0) {
      localStorage.setItem('user', '[' + JSON.stringify(arrayState) + ']');
    } else {
      const storige = localStorage.getItem('user');
      localStorage.setItem('user', (JSON.stringify(JSON.parse(storige).concat(arrayState))));
    }
    this.props.history.push('/entry');
  }

  result() {
    let flag = true;
    for (const key in this.state) {
      flag = flag && (this.state[key].error === false && this.state[key].value !== "");
    }
    return flag ? this.addToLocalStorige() : alert("Error!!!!");
  }

  render() {
    const {lastName, firstName, phoneNumber, password, confirmPassword} = this.state;
    return (
      <div className='container'>
        <div className='row'>
          <div className="col-4"></div>
          <div className='Registration col-4'>
            <label>Registration</label>
            <FormLabel labelText={'First name'} inputType={'text'}
                       inputClass={`${firstName.error === true ? 'Red form-control' : 'form-control'}`} inputValue={firstName.value}
                       inputOnChange={(e) => this.handleChangeInput(e.target.value, 'firstName', /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)}/>

            <FormLabel labelText={'Last name'} inputType={'text'} inputClass={`${lastName.error === true ? 'Red form-control' : 'form-control'}`}
                       inputValue={lastName.value}
                       inputOnChange={(e) => this.handleChangeInput(e.target.value, 'lastName', /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)}/>

            <FormLabel labelText={'Number phone'} inputType={'text'}
                       inputClass={`${phoneNumber.error === true ? 'Red form-control' : 'form-control'}`} inputValue={phoneNumber.value}
                       inputOnChange={(e) => this.handlerChangeNumberPhone(e.target.value, 'phoneNumber', /\d{1,}/g)}/>

            <FormLabel labelText={'Enter password'} inputType={'password'}
                       inputClass={`${this.state.password.error === true ? 'Red form-control' : 'form-control'}`} inputValue={password.value}
                       inputOnChange={(e) => this.validPassword(e.target.value)}/>

            <FormLabel labelText={'Confirm password'} inputType={'password'}
                       inputClass={`${this.state.confirmPassword.error === true ? 'Red form-control' : 'form-control'}`}
                       inputValue={confirmPassword.value}
                       inputOnChange={(e) => this.validConfirmPassword(e.target.value)}/><hr/>

            <Button className={'btn btn-outline-secondary col-6'} click={() => this.result()} text={'Input'}/>
            <Button className={'btn btn-outline-secondary col-6'} click={() => this.props.history.push('/entry')} text={'Cancel'}/>
          </div>
          <div className='col4'></div>
        </div>
      </div>
    );
  }
}

export default Registration;