/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Button from '@mui/material/Button/Button';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import {useFluxListener, useState} from '@nlabs/arkhamjs-utils-react/lib';
import {FC} from 'react';

import {Form} from '../components/Form/Form';
import {TextField} from '../components/Form/TextField';
import {PageHeader} from '../components/PageHeader';
import {AuthConstants} from '../constants/AuthConstants';
import {PageView, PageViewProps} from './PageView';
import {ErrorMessage} from '../components/ErrorMessage/ErrorMessage';

export interface SignInViewProps extends PageViewProps {
  readonly logo?: JSX.Element;
  readonly onSignIn?: (username: string, password: string) => void;
  readonly onSignUp?: () => void;
}

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

export const onSubmit = ({onSignIn}) => (values): void => {
  const {password, username} = values;
  onSignIn(username, password);
};

export const SignInView: FC<SignInViewProps> = ({
  logo,
  name = 'signIn',
  onSignIn = () => { },
  onSignUp = () => { },
  title = 'Sign In'
}) => {
  const [state, setState] = useState({
    account: {
      password: '',
      username: ''
    },
    errorMessage: null
  });
  const {account, errorMessage} = state;

  useFluxListener(AuthConstants.SIGN_IN_SUCCESS, onSuccess);
  useFluxListener(AuthConstants.SIGN_IN_FAILED, onFailure(setState));

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
          <Card className="br3">
            <CardContent>
              {logo && <div className="flex flex-auto flex-column items-center mb5 mt4">{logo}</div>}
              <ErrorMessage message={errorMessage} />
              <Form
                onSubmit={onSubmit({onSignIn})}
                defaultValues={account}>
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
                      <p className="f6 hover-mid-gray mt1">Forgot password?</p>
                    </div>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-xs-auto">
                      <Button className="ml1" color="primary" size="large" onClick={onSignUp} variant="text">
                        Create new account
                      </Button>
                      <Button className="ml1" color="primary" size="large" type="submit" variant="contained">
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
