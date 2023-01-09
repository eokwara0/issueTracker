import React, { Component } from 'react';



/** 🐔 validates if data is null and returns the appropriate value */
function displayFormat(date) {
  return (date !== null) ? new Date(date).toDateString() : '';
}

/** 🧪 edits the format of the date */
function editFormat(date) {
  return (date !== null) ? new Date(date).toDateString().substr(0, 10) : '';
}

/** 🐫converts string into a Date Object */
function unformat(str) {
  const val = new Date(str);
  return Number.isNaN(val.getTime()) ? null : val;
}

/** 🚀Date Component */
export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: editFormat(props.value),
      focused: false,
      valid: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /** 🤔Handles the event upon input focus */
  onFocus() {
    this.setState({ focused: true });
  }

/** 🤑 Handles the event onBlur*/ 
  onBlur(event) {
    const { value, valid : oldValid } = this.state;
    const { onValidityChange, onChange } = this.props;
    const dateValue = unformat( value );
    const valid = value === '' || dateValue !== null;
    if ( valid !== oldValid && onValidityChange ){
        onValidityChange(event, valid );
    }
    this.setState({ focused : false, valid });
    if (valid) onChange(event,dateValue);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
        this.setState({ value: e.target.value });
    }
 }
 
    render() {
        const { valid, focused, value } = this.state;
        const { value: origValue , onValidityChange, ...props } = this.props;
        const displayValue = (focused || !valid) ? value : displayFormat(origValue);
        return (
            <input
                {...props}
                value={displayValue}
                placeholder={focused ? 'yyyy-mm-dd' : null}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
            />
    );
    }


}
