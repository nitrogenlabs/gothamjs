import {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import {InputProps} from '@material-ui/core/Input';
import {InputLabelProps} from '@material-ui/core/InputLabel';

import {DatePickerOrigin} from './datePicker';

export interface TimePickerClockProps {
  readonly action: (actions: any) => void;
  readonly value: Date;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
  readonly closeClock: () => void;
  readonly selectableMinutesInterval?: number;
  readonly okToConfirm?: boolean;
  readonly classes?: {
    root?: string
    digitalContainer?: string
    clockBackground?: string
    hand?: string
    textSelected?: string
    minuteDotSelected?: string
  };
}

export interface TimePickerProps {
  readonly name: string;
  readonly label?: string;
  readonly value: Date;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
  readonly selectableMinutesInterval?: number;
  readonly anchorOrigin?: DatePickerOrigin;
  readonly transformOrigin?: DatePickerOrigin;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly fullWidth?: boolean;
  readonly dialog?: boolean;
  readonly okToConfirm?: boolean;
  readonly endIcon?: Node;
  readonly className?: string;
  readonly InputLabelProps?: InputLabelProps;
  readonly InputProps?: InputProps;
  readonly FormHelperTextProps?: FormHelperTextProps;
  readonly ClockProps?: TimePickerClockProps;
}

export interface TimePickerState {
  readonly time: Date;
}
