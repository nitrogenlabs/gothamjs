/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import isEqual from 'lodash/isEqual';
import reduce from 'lodash/reduce';
import React from 'react';
import {FormSpy} from 'react-final-form';

export class AutoSaveBase extends React.Component<any, any> {
  changing: Promise<any>;

  constructor(props) {
    super(props);

    // Methods
    this.update = this.update.bind(this);

    // Initial state
    const {values} = props;
    this.state = {submitting: false, values};
  }

  componentDidUpdate(prevProps) {
    const {active} = this.props;

    if(active && active !== prevProps.active) {
      // blur occurred
      this.update(active);
    }
  }

  async update(blurredField) {
    if(this.changing) {
      await this.changing;
    }

    const {values: newValues, setFieldData = () => {}, onChange} = this.props;
    const {values: existingValues} = this.state;

    if(!isEqual(existingValues, newValues)) {
      const updatedValues = reduce(existingValues, (result, value, key) =>
        (isEqual(value, newValues[key]) ? result : result.concat({[key]: value})), []);

      // values have changed
      this.setState({submitting: true, values: updatedValues});
      setFieldData(blurredField, {saving: true});
      this.changing = onChange(updatedValues);
      await this.changing;
      delete this.changing;
      this.setState({submitting: false});
      setFieldData(blurredField, {saving: false});
    }
  }

  render() {
    return null;
  }
}

export const AutoSave = (props) => (
  <FormSpy
    {...props}
    component={AutoSaveBase}
    formatOnBlur
    subscription={{active: true, values: true}} />
);
