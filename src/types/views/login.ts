import {PageViewProps} from './page';

export interface LoginViewProps extends PageViewProps {
  readonly logo?: JSX.Element;
}

export interface LoginViewState {
  readonly authentication?: object;
  readonly session?: object;
}
