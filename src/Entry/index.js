import React, {Component} from "react";
import './style.css'
import {connect} from 'react-redux';
import {sha256} from 'js-sha256';
import {addNewUser} from '../core/store/actions/actionsUserList';
import FormLabel from '../components/Form_label';
import Button from '../components/Button';

class Entry extends Component {
  constructor() {
    super();
    this.state = {
      numberPhone: {
        value: "",
        error: false
      },
      password: {
        value: "",
        error: false
      }
    }
  }

  handleChangeInput(value, fieldName) {
    value ? this.setState({[fieldName]: {value, error: false}}) : this.setState({[fieldName]: {value, error: true}});
  }

  entryUser(numberPhone, password) {
    const arrayStorage = JSON.parse(localStorage.getItem('user'));
    for (const num in arrayStorage) {
      if (arrayStorage[num].phoneNumber.value === numberPhone && arrayStorage[num].password.value === sha256(password)) {
        this.props.history.push('/home');
        return this.props.entryUser(arrayStorage[num].firstName.value);
      }
    }
    return this.setState({numberPhone: {value: '', error: true}, password: {value: '', error: true}});
  }

  render() {
    const {numberPhone, password} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className='col-4'></div>
          <div className='Entry col-4'>
            <label>Entry</label>
            <FormLabel labelText={'Number phone'} inputType={'text'}
                         inputClass={`${numberPhone.error === true ? 'Red form-control' : 'form-control'}`} inputValue={numberPhone.value}
                          inputOnChange={(e) => this.handleChangeInput(e.target.value, 'numberPhone')}/>
            <FormLabel labelText={'Password'} inputType={'text'}
                         inputClass={`${password.error === true ? 'Red form-control' : 'form-control'}`} inputValue={password.value}
                          inputOnChange={(e) => this.handleChangeInput(e.target.value, 'password')}/><hr/>
            <Button className={'btn btn-outline-secondary col-6'} click={() => this.entryUser(numberPhone.value, password.value)} text={'Enter'}/>
            <Button className={'btn btn-outline-secondary col-6'} click={() => this.props.history.push('/registration')} text={'Registration'}/>
          </div>
          <div className='col-4'></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  entryUser: (text) => dispatch(addNewUser(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
