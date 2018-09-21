import React, {Component} from "react";
import {connect} from 'react-redux';
import './styles.css';
import {addNewUser} from "../core/store/actions/actionsUserList";
import {withRouter} from 'react-router';

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

  testPassword(callback) {
    if (this.state.password.value === this.state.confirmPassword.value && (this.state.password.value && this.state.confirmPassword.value)) {
      this.setState({
        password: {
          value: this.state.password.value,
          error: false
        }, confirmPassword: {value: this.state.confirmPassword.value, error: false}
      });
    } else {
      this.setState({
        password: {
          value: this.state.password.value,
          error: true
        }, confirmPassword: {value: this.state.confirmPassword.value, error: true}
      }, () => {
        callback();
      });
    }
  }

  addToLocalStorige() {
    localStorage.setItem('user' + (localStorage.length + 1), JSON.stringify(this.state));
    this.props.history.push('/entry');
  }

  result() {
    let flag = true;
    this.testPassword();///Проверить до render!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (const key in this.state) {
      flag = flag && (this.state[key].error === false && this.state[key].value !== "");
      console.log('.....result.........', (this.state[key].error === false && this.state[key].value !== ""));
    }
    return flag ? this.addToLocalStorige() : alert("Error!!!!");
  }

  render() {
    const {lastName, firstName, phoneNumber, password, confirmPassword} = this.state;
    console.log('.....state......', this.state);
    return (
      <div className='container'>
        <div className='row'>
          <div className="col-4"></div>
          <div className='Registration col-4'>
            <label>First name</label>
            <div>
              <input type="text" className={`${firstName.error === true ? 'Red' : ''}`} value={firstName.value} onChange={(e) => this.handleChangeInput(e.target.value, 'firstName', /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)}/>
            </div>
            <label>Last name</label>
            <div>
              <input type="text" className={`${lastName.error === true ? 'Red' : ''}`} value={lastName.value} onChange={(e) => this.handleChangeInput(e.target.value, 'lastName', /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)}/>
            </div>
            <div>
              <label>Number phone</label>
              <div>
                <input type='text' className={`${phoneNumber.error === true ? 'Red' : ''}`} value={phoneNumber.value} onChange={(e) => this.handleChangeInput(e.target.value, 'phoneNumber', /\d{1,}/g)}/></div>
            </div>
            <div>
              <label>Enter password</label>
              <div>
                <input type='text' className={`${password.error === true ? 'Red' : ''}`} value={password.value} onChange={(e) => this.handleChangeInput(e.target.value, 'password')}/></div>
              <label>Confirm password</label>
              <div>
                <input type='text' className={`${confirmPassword.error === true ? 'Red' : ''}`} value={confirmPassword.value} onChange={(e) => this.handleChangeInput(e.target.value, 'confirmPassword')}/></div>
            </div>
            <button onClick={() => this.result()}>Input</button>
          </div>
          <div className='col4'></div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewUser: (newUser) => dispatch(addNewUser(newUser))
});

export default connect(mapDispatchToProps)(Registration);

