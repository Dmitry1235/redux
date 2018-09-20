import React, {Component} from 'react';

class Li extends Component {
  render() {
    const {className, key, click, text} = this.props;
    return (
      <li className={`list-group-item liClass ${className && 'list-group-item doneClass'}`} key={key}
          onClick={click}>{text}</li>
    );
  }
}

export default Li;