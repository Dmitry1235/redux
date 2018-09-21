import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from 'react-router';

class Entry extends Component {
  constructor() {
    super();
    this.state={
      numberPhone:{
        value: "",
        error: false
      },
      password:{
        value: "",
        error: false
      }
    }
}

  handleChangeInput(value, fieldName) {
    value ? this.setState({[fieldName]: {value, error: false}}) : this.setState({[fieldName]: {value, error: true}});
  }
  
  entryUser(){
    for(const key in this.props.users){
      if(this.props.users[key].numberPhone === this.state.numberPhone.value && this.props.users[key].password === this.state.password.value){
        this.props.history.push('/home');
        break;
      }else{
        this.setState({numberPhone:{value:"", error:true}});
        this.setState({password:{value:"", error:true}});
      }
    }
  }

  render() {
    const {numberPhone, password} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className='col-4'></div>
          <div className='Entry col-4'>
            <label>Entry</label>
            <div>
              <label>Number phone</label>
              <div>
                <input type='text' className={`${numberPhone.error === true ? 'Red' : ''}`} value={numberPhone.value} onChange={(e) => this.handleChangeInput(e.target.value, 'numberPhone')}/>
              </div>
            </div>
            <div>
              <label>Password</label>
              <div>
                <input type='text' className={`${password.error === true ? 'Red' : ''}`} value={password.value} onChange={(e) => this.handleChangeInput(e.target.value, 'password')}/>
              </div>
            </div>
            <button onClick={() => this.entryUser()}>Enter</button>
            <button onClick={() => this.props.history.push('/registration')}>Registration</button>
          </div>
          <div className='col-4'></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.toDoListReduser.users,

});

export default connect(mapStateToProps, withRouter)(Entry);
