import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import connect from 'react-redux/es/connect/connect';
import FormLabel from '../components/FormLabel';
import Button from '../components/Button/index';
import { login } from '../core/api/index';
import { changeFilter } from '../core/store/actions/actionsDoList';
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

  componentDidMount() {
    if(this.props.User.phoneNumber && this.props.history.location.pathname !== '/'){
      this.props.history.push('/');
    }
  }

  handleChangeInput(value, fieldName) {
    value ? this.setState({ [fieldName]: { value, error: false } }) : this.setState({ [fieldName]: { value, error: true } });
  }

  entryUser(numberPhone, password) {
    const objectUser = {
      phoneNumber: numberPhone,
      password: sha256(password),
    };

    login(objectUser)
      .then((data) => {
        if (data.data.length !== 0) {
          sessionStorage.setItem('User', JSON.stringify({
            phoneNumber: data.data[0].phoneNumber,
            token: data.token,
            User: data,
          }));
          this.props.history.push('/');
        } else {
          return this.setState({
            numberPhone: { value: this.state.numberPhone.value, error: true },
            password: { value: '', error: true },
          });
        }
      });
  }

  render() {
    const { numberPhone, password } = this.state;

    return (
      <div className="container-flued">
        <div className="row ">
          <div className="Entry col-9 col-xl-3 col-lg-4 col-md-5 col-sm-6 align-items-center">
            <h3> Please Sign In</h3>
            <FormLabel
              labelText="Number phone"
              inputType="text"
              inputClass="form-control"
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
            <small>{password.error ? 'Invalid number or password' : ''}</small>
            <hr />
            <Button
              className="btn btn-primary col-12"
              click={() => this.entryUser(numberPhone.value, password.value)}
              text="Log In"
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
