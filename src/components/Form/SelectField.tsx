import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialNativeSelect from '@material-ui/core/NativeSelect/NativeSelect';
import * as React from 'react';
import {Field} from 'react-final-form';

import {SelectFieldOption, SelectFieldProps} from '../../types/components/form';

export class SelectField extends React.PureComponent<SelectFieldProps, {}> {
  constructor(props: SelectFieldProps) {
    super(props);

    // Methods
    this.renderOptions = this.renderOptions.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  renderSelect({input}): JSX.Element {
    const {className, label, list, ...props} = this.props;
    let labelElement: JSX.Element;

    if(label) {
      labelElement = <InputLabel shrink>{label}</InputLabel>;
    }

    return (
      <FormControl className={className}>
        {labelElement}
        <MaterialNativeSelect {...props} {...input}>{this.renderOptions(list)}</MaterialNativeSelect>
      </FormControl>
    );
  }

  renderOptions(list: SelectFieldOption[] = []): JSX.Element[] {
    return list.map(({label, value}) => <option key={`${label}${value}`} value={value}>{label}</option>);
  }

  render(): JSX.Element {
    const {name} = this.props;
    return <Field name={name} render={this.renderSelect} />;
  }
}
