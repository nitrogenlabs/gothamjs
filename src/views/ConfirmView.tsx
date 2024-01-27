/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Button from '@mui/material/Button/Button';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import {useFluxListener, useState} from '@nlabs/arkhamjs-utils-react';
import {FC} from 'react';

import {Form} from '../components/Form/Form';
import {TextField} from '../components/Form/TextField';
import {PageHeader} from '../components/PageHeader';
import {AuthConstants} from '../constants/AuthConstants';
import {PageView, PageViewProps} from './PageView';
import {ErrorMessage} from '../components/ErrorMessage/ErrorMessage';

export interface ConfirmViewProps extends PageViewProps {
  onConfirm: (confirmation: object) => any;
  onResend: (confirmation: object) => any;
}

export interface ConfirmViewState {
  readonly authentication?: object;
  readonly errorMessage?: string;
  readonly session?: object;
}

export const onSubmit = (onConfirm) => (values) => onConfirm(values);

export const onSuccess = (): void => {
};

export const onFailure = (setState) => ({error}): void => {
  const {message} = error;
  const errorMessage: string = message;
  setState({errorMessage});
};

export const ConfirmView: FC<ConfirmViewProps> = ({
  onResend = () => { }
}) => {
  const [values, setValues] = useState({
    code: '',
    username: ''
  });

  let errorMessage: string;

  useFluxListener(AuthConstants.SIGN_IN_SUCCESS, onSuccess);
  useFluxListener(AuthConstants.SIGN_IN_FAILED, onFailure(setValues));

  return (
    <PageView title="Confirmation">
      <div className="row">
        <div className="col">
          <PageHeader title="Confirmation">
            Let's verify your phone/email.
          </PageHeader>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-8 col-lg-6">
          <Card className="br3">
            <CardContent>
              <ErrorMessage message={errorMessage} />
              <Form
                onSubmit={onSubmit(setValues)}
                defaultValues={values}>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <TextField label="Username" name="username" type="text" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <TextField label="Confirmation Code" name="code" type="text" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <a onClick={() => onResend(values)}><p className="f5 mid-gray mt1">Resend code?</p></a>
                    </div>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-xs-auto">
                      <Button className="ml1" color="primary" size="large" onClick={() => { }} variant="text">
                        Cancel
                      </Button>
                      <Button className="ml1" color="primary" size="large" type="submit" variant="contained">
                        Confirm
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

export default ConfirmView;
