import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Grid from '@material-ui/core/Grid/Grid';
import {StyleRulesCallback} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import * as React from 'react';

import {Form} from '../components/Form/Form';
import {TextField} from '../components/Form/TextField';
import {PageHeader} from '../components/PageHeader';
import {UserConstants} from '../constants/UserConstants';
import {LoginViewProps, LoginViewState} from '../types/views/login';
import {initComponent} from '../utils/components';
import {PageView} from './PageView';

const styles: StyleRulesCallback = (theme) => ({
  buttonBox: {
    display: 'flex',
    marginBottom: 15,
    marginTop: 30
  },
  buttonRowLeft: {
    display: 'flex'
  },
  buttonRowRight: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  card: {
    borderRadius: 10,
    maxWidth: 750
  },
  forgot: {
    color: theme.palette.grey['400'],
    fontSize: 12,
    marginTop: 5
  },
  logo: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 50,
    marginTop: 30
  }
});

export class LoginViewBase extends React.PureComponent<LoginViewProps, LoginViewState> {
  state: any = {};

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

  renderLogo(logo: JSX.Element, classes): JSX.Element {
    if(logo) {
      return <div className={classes.logo}>{logo}</div>;
    }

    return null;
  }

  render(): JSX.Element {
    const {classes, logo, name = 'login', title = 'Login'} = this.props;

    return (
      <PageView name={name} title={title}>
        <Grid item sm={12}>
          <PageHeader title="Welcome Back">
            Welcome back sign-in now there is lot of new stuff waiting for you.
          </PageHeader>
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="center" justify="center">
            <Card className={classes.card}>
              <CardContent>
                {this.renderLogo(logo, classes)}
                <Form onSubmit={this.onSubmit}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      type="text" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password" />
                  </Grid>
                  <Grid className={classes.buttonBox} container>
                    <Grid item xs={12} className={classes.buttonRowLeft}>
                      <p className={classes.forgot}>Forgot password?</p>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonRowRight}>
                      <Button color="default" size="large" type="submit" variant="text">New Account</Button>
                      <Button color="primary" size="large" type="submit" variant="contained">Sign in</Button>
                    </Grid>
                  </Grid>
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageView>
    );
  }
}

export const LoginView = initComponent(module, LoginViewBase, styles);
export default LoginView;
