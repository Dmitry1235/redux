import React, {Component} from 'react';

class FormLabel extends Component{
  render() {
    const { labelText, inputType, inputClass, inputValue, inputOnChange } = this.props;
    return (
      <div>
        <label>{labelText}</label>
        <div>
          <input type={inputType} className={inputClass} value={inputValue} onChange={inputOnChange}/>
        </div>
      </div>
    );
  }
}

export default FormLabel;