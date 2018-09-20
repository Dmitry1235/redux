import React, {Component} from "react";
import {connect} from 'react-redux';
import './styles.css';

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

  /*uupdate(){
    if((this.state.password.value && this.state.confirmPassword.value) !== "" && this.state.password.value === this.state.confirmPassword.value){
      this.setState({password: {value: this.state.password.value, error: false}});
      this.setState({confirmPassword: {value: this.state.confirmPassword.value, error: false}});
    }else{
      this.setState({password: {value: this.state.password.value, error: true}});
      this.setState({confirmPassword: {value: this.state.confirmPassword.value, error: true}});
    }
  }*/

  handleChangeInput(value, fieldName, regext) {
    value.match(regext) !== null ? this.setState({[fieldName]: {value, error: false}}) : this.setState({[fieldName]: {value, error: true}});
  }

  checkAllFields(state) {
    return true || false;
  }

  result() {
    let flag = true;
    this.setState((prevState) => {
      for(const key in prevState) {
       flag = flag && prevState[key].error;
    console.log('..............', []+prevState[key].error +' '+flag);
    }
  })
}
  render() {
    const {lastName, firstName, phoneNumber, password, confirmPassword} = this.state;
    console.log('.....state......', this.state);
    //console.log('.......hhhhhhhhhhhhhhhhh.......', this.Result());
    return (
      <div className='Registration'>
        <label>First name</label>
        <div><input  type="text" className={`${firstName.error === true ? 'Red' : ''}`} value={firstName.value} onChange={(e) => this.handleChangeInput(e.target.value, 'firstName', /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)}/></div>
        <label>Last name</label>
        <div><input type="text" className={`${lastName.error === true ? 'Red' : ''}`} value={lastName.value} onChange={(e) => this.handleChangeInput(e.target.value, 'lastName', /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)}/></div>
        <div>
          <label>Number phone</label>
          <div><input type='text' className={`${phoneNumber.error === true ? 'Red' : ''}`} value={phoneNumber.value} onChange={(e) => this.handleChangeInput(e.target.value, 'phoneNumber', /\d{1,}/g)}/></div>
        </div>
        <div>
          <label>Enter password</label>
          <div><input type='text' className={`${password.error === true ? 'Red' : ''}`} value={password.value} onChange={(e) => this.handleChangeInput(e.target.value, 'password')}/></div>
          <label>Confirm password</label>
          <div><input type='text' className={`${confirmPassword.error === true ? 'Red' : ''}`} value={confirmPassword.value} onChange={(e) => this.handleChangeInput(e.target.value, 'confirmPassword')}/></div>
        </div>
        <button onClick={() => this.result()}>Input</button>
      </div>
    );
  }
}


export default Registration;
