import {WithStyles} from '@material-ui/core/styles';

export interface AutocompleteFieldProps extends WithStyles<any> {
  readonly getList?: (value: string) => any[];
  readonly name: string;
  readonly suggestions: any[];
  readonly validate?: (object) => object | Promise<object>;
  readonly wait?: number;
}

export interface AutocompleteFieldState {
  readonly single: string;
  readonly suggestions: any[];
  readonly value: string;
}
