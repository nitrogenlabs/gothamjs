import {FluxFramework} from '@nlabs/arkhamjs';
import {CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';

import {AuthConstants} from '../constants/AuthConstants';
import {GothamSigninProps, GothamSignupProps} from '../types/auth';
import {GothamUser} from '../types/user';

export const userActions = (Flux: FluxFramework) => ({
  changePassword: (oldPassword: string, newPassword: string): Promise<any> => Auth.currentAuthenticatedUser()
    .then((user: GothamUser) => Auth.changePassword(user, oldPassword, newPassword))
    .then((data) => console.log(data))
    .catch((error) => console.log(error)),

  confirmSignIn: () => {

  },

  confirmSignUp: (username: string, code: string): Promise<any> =>
    // After retrieving the confirmation code from the user
    Auth.confirmSignUp(username, code, {forceAliasCreation: false})
      .then((data) => console.log(data))
      .catch((error) => console.log(error)),

  currentSession: (): Promise<CognitoUserSession> => Auth.currentSession(),

  currentUser: (): Promise<CognitoUser> => Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log(user);
      return user;
    })
    .catch((error) => console.log(error)),

  forgotPassword: (username: string): Promise<any> => Auth.forgotPassword(username)
    .then((data) => console.log(data))
    .catch((error) => console.log(error)),

  forgotPasswordSubmit: (username: string, code: string, newPassword: string): Promise<any> =>
    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then((data) => console.log(data))
      .catch((error) => console.log(error)),

  signIn: ({password, username}: GothamSigninProps): Promise<any> => Auth.signIn(username, password)
    .then((user) => Flux.dispatch({type: AuthConstants.SIGNIN_SUCCESS, user}))
    .catch((error) => Flux.dispatch({error, type: AuthConstants.SIGNIN_FAILURE})),

  signOut: (): Promise<any> => Auth.signOut()
    .then((data) => console.log(data))
    .catch((error) => console.log(error)),

  signUp: (user: GothamUser): Promise<any> => {
    const {email, password, phone, username} = user;
    const signupProps: GothamSignupProps = {
      attributes: {
        email,
        phone_number: phone
      },
      password,
      username,
      validationData: []
    };

    return Auth.signUp(signupProps)
      .then((user) => Flux.dispatch({type: AuthConstants.SIGNUP_SUCCESS, user}))
      .catch((error) => Flux.dispatch({error, type: AuthConstants.SIGNIN_FAILURE}));
  },

  verifyCurrentUserAttribute: (attr): Promise<any> => Auth.verifyCurrentUserAttribute(attr)
    .then(() => {
      console.log('a verification code is sent');
    }).catch((error) => {
      console.log('failed with error', error);
    }),

  verifyCurrentUserAttributeSubmit: (attr): Promise<any> =>
    // To verify attribute with the code
    Auth.verifyCurrentUserAttributeSubmit(attr, 'the_verification_code')
      .then(() => {
        console.log('phone_number verified');
      }).catch((error) => {
        console.log('failed with error', error);
      })

});
