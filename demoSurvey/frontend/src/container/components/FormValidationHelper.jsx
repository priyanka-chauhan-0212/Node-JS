import { Component } from 'react';

import {
  EMPTY_ARRAY,
  EMPTY_STRING,
} from '../../container/constants/commonConstants';

export default class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      redirect: false,
      to: EMPTY_STRING,
      errorMessage: EMPTY_STRING,
      errors: EMPTY_ARRAY,
    };
  }

  _handleInput = event => {
    const {
      form: { errors },
    } = this.state;
    let value = event.target.value;
    let name = event.target.name;
    if (value === EMPTY_STRING) {
      value = EMPTY_STRING;
    }
    this.setState({
      [name]: value,
      form: {
        errors: {
          ...errors,
          [name]: EMPTY_STRING,
        },
      },
    });
  };

  _handleInputObject = event => {
    const {
      form: { errors },
    } = this.state;
    let value = event.target.value;
    let name = event.target.name;
    let keys = name.split('.');
    if (keys.length > 1) {
      let obj = Object.assign({}, this.state[keys[0]]);
      obj[keys[1]] = value;
      this.setState({
        [keys[0]]: obj,
        form: {
          errors: {
            ...errors,
            [keys[1]]: EMPTY_STRING,
          },
        },
      });
    } else {
      this._handleInput(event);
    }
  };
}
