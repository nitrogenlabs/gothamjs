import {DateFormatInput} from 'material-ui-next-pickers';
import React from 'react';
import {Field} from 'react-final-form';
import {DatePickerProps, DatePickerState} from 'types/components/datePicker';

export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  constructor(props: DatePickerProps) {
    super(props);

    // Methods
    this.renderField = this.renderField.bind(this);
  }

  renderField({input}): JSX.Element {
    return <DateFormatInput fullWidth {...this.props} {...input} />;
  }

  render(): JSX.Element {
    const {name} = this.props;
    return <Field name={name} render={this.renderField} />;
  }
}
