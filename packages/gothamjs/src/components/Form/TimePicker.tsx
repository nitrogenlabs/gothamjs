import {TimeFormatInput} from 'material-ui-next-pickers';
import React from 'react';
import {Field} from 'react-final-form';
import {TimePickerProps, TimePickerState} from 'types/components/timePicker';

export class TimePicker extends React.Component<TimePickerProps, TimePickerState> {
  constructor(props: TimePickerProps) {
    super(props);

    // Methods
    this.renderField = this.renderField.bind(this);
  }

  renderField({input}): JSX.Element {
    return <TimeFormatInput fullWidth {...this.props} {...input} />;
  }

  render(): JSX.Element {
    const {name} = this.props;
    return <Field name={name} render={this.renderField} />;
  }
}
