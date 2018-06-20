import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import {StyleRulesCallback, WithStyles, withStyles} from '@material-ui/core/styles';
import {Flux} from 'arkhamjs';
import * as React from 'react';

import {Form} from '../../components/Form/Form';
import {PageHeader} from '../../components/PageHeader/PageHeader';
import {TextField} from '../../components/TextField/TextField';
import {UserConstants} from '../../constants/UserConstants';
import {PageView} from '../PageView/PageView';

const styles: StyleRulesCallback = () => ({
});

export type LoginViewProps = WithStyles<typeof styles>;

export interface LoginViewState {
  readonly authentication: object;
  readonly session: object;
}

export class LoginViewBase extends React.Component<LoginViewProps, LoginViewState> {
  constructor(props) {
    super(props);

    // Methods
    this.onFailure = this.onFailure.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);

    // Initial state
    this.state = {
      authentication: {},
      session: Flux.getState('user.session')
    };
  }

  componentWillMount(): void {
    // Add listeners
    Flux.on(UserConstants.LOGIN_SUCCESS, this.onSuccess);
    Flux.on(UserConstants.LOGIN_FAILED, this.onFailure);
  }

  componentWillUnmount(): void {
    // Remove listeners
    Flux.off(UserConstants.LOGIN_SUCCESS, this.onSuccess);
    Flux.off(UserConstants.LOGIN_FAILED, this.onFailure);
  }

  onSuccess(): void {

  }

  onFailure(): void {

  }

  onSubmit(values): void {
    this.setState({authentication: values});
  }

  render(): JSX.Element {
    return (
      <PageView name="login">
        <Grid item sm={12}>
          <PageHeader title="Welcome Back">
            Welcome back sign-in now there is lot of new stuff waiting for you.
          </PageHeader>
        </Grid>

        <Form onSubmit={this.onSubmit}>
          <Grid item xs={12}>
            <TextField name="email" type="text" label="Email Address" className="loginInput" />
          </Grid>
          <Grid item xs={12}>
            <TextField name="password" type="text" label="Password" className="loginInput" />
          </Grid>
          <Grid item xs={12}>
            <Button color="default" size="large" type="submit" value="" variant="text">New Account</Button>
            <Button color="primary" size="large" type="submit" value="" variant="contained">Signin</Button>
            <p className="forgetPass">Have you forgot your username or password?</p>
          </Grid>
        </Form>
      </PageView>
    );
  }
}

export const LoginView = withStyles(styles, {withTheme: true})(LoginViewBase);
