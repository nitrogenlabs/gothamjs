import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialNativeSelect from '@material-ui/core/NativeSelect/NativeSelect';
import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';
import {Field} from 'react-final-form';

import {SelectFieldOption, SelectFieldProps} from '../../types/components/form';
import {initStyle} from '../../utils/components';
import {SelectOption} from './SelectOption';

const styles: StyleRulesCallback = () => ({
  field: {
    display: 'flex'
  }
});

export class SelectFieldBase extends React.PureComponent<SelectFieldProps, {}> {
  constructor(props: SelectFieldProps) {
    super(props);

    // Methods
    this.renderOptions = this.renderOptions.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  renderSelect({input}): JSX.Element {
    const {classes, label, list = [], ...props} = this.props;
    let labelElement: JSX.Element;

    // If using a label, add a label component
    if(label) {
      labelElement = <InputLabel shrink>{label}</InputLabel>;
    }

    // If no value is added, set the first item as the initial value
    if(list.length && props.value === undefined) {
      props.value = list[0].value;
    }

    return (
      <FormControl className={classes.field}>
        {labelElement}
        <MaterialNativeSelect {...props} {...input}>{this.renderOptions(list)}</MaterialNativeSelect>
      </FormControl>
    );
  }

  renderOptions(list: SelectFieldOption[] = []): JSX.Element[] {
    return list.map((optionProps: SelectFieldOption) => {
      const {name} = this.props;
      const {label, value} = optionProps;
      return <SelectOption key={`${name}${label}${value}`} {...optionProps} />;
    });
  }

  render(): JSX.Element {
    const {name} = this.props;
    return <Field name={name} render={this.renderSelect} />;
  }
}

export const SelectField = initStyle(SelectFieldBase, styles);
