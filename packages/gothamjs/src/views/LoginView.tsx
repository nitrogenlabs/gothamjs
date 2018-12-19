import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';

import {Form} from '../components/Form/Form';
import {TextField} from '../components/Form/TextField';
import {PageHeader} from '../components/PageHeader';
import {LoginConstants} from '../constants/LoginConstants';
import {LoginViewProps, LoginViewState} from '../types/views/login';
import {initComponent} from '../utils/components';
import {ArkhamJS} from '../utils/flux';
import {PageView} from './PageView';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
const styles: StyleRulesCallback = (theme) => ({
  btn: {
    marginLeft: 5
  },
  card: {
    borderRadius: 10
  },
  errorMessage: {
    backgroundColor: theme.palette.error.dark,
    borderColor: theme.palette.error.light,
    borderRadius: 3
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
    this.validate = this.validate.bind(this);

    // Initial state
    this.state = {
      account: {
        password: '',
        username: ''
      },
      errorMessage: null
    };
  }

  componentDidMount(): void {
    // Add listeners
    ArkhamJS.flux.on(LoginConstants.SUCCESS, this.onSuccess);
    ArkhamJS.flux.on(LoginConstants.FAILED, this.onFailure);
  }

  componentWillUnmount(): void {
    // Remove listeners
    ArkhamJS.flux.off(LoginConstants.SUCCESS, this.onSuccess);
    ArkhamJS.flux.off(LoginConstants.FAILED, this.onFailure);
  }

  onSuccess(): void {
  }

  onFailure({error}): void {
    const {code} = error;
    let errorMessage: string;

    switch(code) {
      case 'UserNotFoundException': {
        errorMessage = 'User was not found.';
        break;
      }
      case 'UserNotConfirmedException': {
        errorMessage = 'User has noot yet been confirmed. Please check your email or text messages.';
        break;
      }
    }

    this.setState({errorMessage});
  }

  onSubmit(values): void {
    const {onLogin = () => {}} = this.props;
    const {password, username} = values;
    onLogin(username, password);
  }

  validate() {

  }

  renderLogo(logo: JSX.Element, classes): JSX.Element {
    if(logo) {
      return <div className={classes.logo}>{logo}</div>;
    }

    return null;
  }

  renderMessage(message: string): JSX.Element {
    if(message) {
      const {classes} = this.props;
      return <div className={classes.errorMessage}>{message}</div>;
    }

    return null;
  }

  render(): JSX.Element {
    const {
      classes,
      logo,
      name = 'login',
      onSignup = () => {},
      title = 'Login'
    } = this.props;
    const {account, errorMessage} = this.state;

    return (
      <PageView name={name} title={title}>
        <div className="row">
          <div className="col">
            <PageHeader title="Welcome Back">
              Welcome back sign-in now there is lot of new stuff waiting for you.
            </PageHeader>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <Card className={classes.card}>
              <CardContent>
                {this.renderLogo(logo, classes)}
                {this.renderMessage(errorMessage)}
                <Form
                  onSubmit={this.onSubmit}
                  initialValues={account}
                  validate={this.validate}
                  validateOnBlur>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <TextField label="Username" name="username" type="text" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <TextField label="Password" name="password" type="password" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className={classes.forgot}>Forgot password?</p>
                      </div>
                    </div>
                    <div className="row justify-content-end">
                      <div className="col-xs-auto">
                        <Button className={classes.btn} color="default" size="large" onClick={onSignup} variant="text">
                          Create new account
                        </Button>
                        <Button className={classes.btn} color="primary" size="large" type="submit" variant="contained">
                          Sign in
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageView >
    );
  }
}

export const LoginView = initComponent(module, LoginViewBase, styles);
export default LoginView;
