import React, {Component} from "react";

class Entry extends Component {
  render(){
    return (
      <div className='Entry'>
        <label>Entry</label>
        <div>
          <label>Login</label>
          <div>
            <input type='text'/>
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input type='text'/>
          </div>
        </div>
      </div>
    );
  }
}

export default Entry;