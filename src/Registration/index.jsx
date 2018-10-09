import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import connect from 'react-redux/es/connect/connect';
import FormLabel from '../components/FormLabel';
import Button from '../components/Button/index';
import { addUserAsync } from '../core/api/index';
import { changeFilter } from '../core/store/actions/actionsDoList';

import './styles.css';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      lastName: {
        value: '',
        error: false,
      },
      firstName: {
        value: '',
        error: false,
      },
      phoneNumber: {
        value: '',
        error: false,
      },
      password: {
        value: '',
        error: false,
      },
      confirmPassword: {
        value: '',
        error: false,
      },
    };
  }

  componentDidMount() {
    if(this.props.User.phoneNumber && this.props.history.location.pathname !== '/'){
      this.props.history.push('/');
    }
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
      password: sha256(this.state.password.value),
    };

    addUserAsync(objectLocalStorage)
      .then((data) => {
        if (data.ok) {
          alert('Are you registered ');
          this.props.history.push('/entry');
        } else {
          this.setState({ phoneNumber: { value: '', error: true } });
        }
      });
  }

  render() {
    const {
      lastName, firstName, phoneNumber, password, confirmPassword,
    } = this.state;

    return (
      <div className="container-flued">
        <div className="row ">
          <div className="Registration col-9 col-xl-3 col-lg-4 col-md-5 col-sm-6">
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
            {phoneNumber.error && <small>A user with this number already exists</small>}
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
            <Button className="btn btn-primary  col-12" click={() => this.checkValidation()} text="Sign Up" />
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
  remove: () => dispatch(changeFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
