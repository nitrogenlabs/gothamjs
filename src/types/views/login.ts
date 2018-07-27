import {PageViewProps} from './page';

export interface LoginViewProps extends PageViewProps {
  readonly props?: LoginViewConfig;
}

export interface LoginViewState {
  readonly authentication?: object;
  readonly session?: object;
}

export interface LoginViewConfig {
  readonly logo?: JSX.Element;
}
