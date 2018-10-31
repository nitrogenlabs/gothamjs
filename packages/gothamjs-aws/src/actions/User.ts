import {CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';

import {UserType} from '../types/user';

export class User {
  changePassword(oldPassword: string, newPassword: string): Promise<any> {
    return Auth.currentAuthenticatedUser()
      .then((user: UserType) => Auth.changePassword(user, oldPassword, newPassword))
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  confirmSignup(username: string, code: string): Promise<any> {
    // After retrieving the confirmation code from the user
    return Auth.confirmSignUp(username, code, {forceAliasCreation: false})
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  currentSession(): Promise<CognitoUserSession> {
    return Auth.currentSession();
  }

  currentUser(): Promise<CognitoUser> {
    return Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((error) => console.log(error));
  }

  forgotPassword(username: string): Promise<any> {
    return Auth.forgotPassword(username)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<any> {
    // Collect confirmation code and new password, then
    return Auth.forgotPasswordSubmit(username, code, newPassword)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  login() {

  }

  signup(user: UserType): Promise<any> {
    const {email, password, phone, username} = user;

    return Auth.signUp({
      attributes: {
        email,
        phone_number: phone
      },
      password,
      username,
      validationData: []
    })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.log(error));
  }

  signout(): Promise<any> {
    return Auth.signOut()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  verifyCurrentUserAttribute(attr): Promise<any> {
    return Auth.verifyCurrentUserAttribute(attr)
      .then(() => {
        console.log('a verification code is sent');
      }).catch((error) => {
        console.log('failed with error', error);
      });
  }

  verifyCurrentUserAttributeSubmit(attr): Promise<any> {
    // To verify attribute with the code
    return Auth.verifyCurrentUserAttributeSubmit(attr, 'the_verification_code')
      .then(() => {
        console.log('phone_number verified');
      }).catch((error) => {
        console.log('failed with error', error);
      });
  }
}
