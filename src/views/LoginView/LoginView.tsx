/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import {makeStyles} from '@material-ui/styles';
import {useFlux, useState} from '@nlabs/arkhamjs-utils-react/lib';
import * as React from 'react';

import {Form} from '../../components/Form/Form';
import {TextField} from '../../components/Form/TextField';
import {PageHeader} from '../../components/PageHeader/PageHeader';
import {Theme} from '../../config/theme.types';
import {LoginConstants} from '../../constants/LoginConstants';
import {PageView} from '../PageView/PageView';
import {LoginViewProps} from './LoginView.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  btn: {
    marginLeft: 5
  },
  card: {
    borderRadius: 10
  },
  errorMessage: {
    backgroundColor: theme.palette.error.light,
    borderRadius: 3,
    color: theme.palette.error.dark,
    fontSize: '14px',
    marginBottom: 15,
    padding: '10px 5px'
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
}));

export const onSuccess = (): void => {
};

export const onFailure = (setState) => ({error}): void => {
  const {code} = error;
  let errorMessage: string;

  switch(code) {
    case 'UserNotFoundException': {
      errorMessage = 'Username and/or password was not found.';
      break;
    }
    case 'UserNotConfirmedException': {
      errorMessage = 'User has not yet been confirmed. Please check your email or text messages.';
      break;
    }
  }

  setState({errorMessage});
};

export const onSubmit = (props) => (values): void => {
  const {onLogin = () => {}} = props;
  const {password, username} = values;
  onLogin(username, password);
};

export const validate = (): any => {

};

export const renderLogo = (logo: JSX.Element, classes): JSX.Element => {
  if(logo) {
    return <div className={classes.logo}>{logo}</div>;
  }

  return null;
};

export const renderMessage = (message: string): JSX.Element => {
  if(message) {
    const classes = useStyles();
    return <div className={classes.errorMessage}>{message}</div>;
  }

  return null;
};

export const LoginView = (props: LoginViewProps) => {
  const {
    logo,
    name = 'login',
    onSignup = () => {},
    title = 'Login'
  } = props;

  // Initial state
  const [state, setState] = useState({
    account: {
      password: '',
      username: ''
    },
    errorMessage: null
  });
  const {account, errorMessage} = state;

  const classes = useStyles();

  useFlux(LoginConstants.SUCCESS, onSuccess);
  useFlux(LoginConstants.FAILED, onFailure(setState));

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
              {renderLogo(logo, classes)}
              {renderMessage(errorMessage)}
              <Form
                onSubmit={onSubmit(props)}
                initialValues={account}
                validate={validate}
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
};

export default LoginView;
