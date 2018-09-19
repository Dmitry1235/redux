import React, {Component} from 'react';

class Button extends Component {
  render() {
    const {className, click, text} = this.props;
    return (
      <button className={className} onClick={click}>{text}</button>
    );
  }
}

export default Button;