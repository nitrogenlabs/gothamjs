/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import {useFluxListener, useState} from '@nlabs/arkhamjs-utils-react';
import * as React from 'react';

import {Form} from '../components/Form/Form';
import {TextField} from '../components/Form/TextField';
import {PageHeader} from '../components/PageHeader';
import {AuthConstants} from '../constants/AuthConstants';
import {PageView, PageViewProps} from './PageView';

export interface ConfirmViewProps extends PageViewProps {
  onConfirm: (confirmation: object) => any;
  onResend: (confirmation: object) => any;
}

export interface ConfirmViewState {
  readonly authentication?: object;
  readonly errorMessage?: string;
  readonly session?: object;
}

// const useStyles: any = makeStyles((theme: Theme) => ({
//   btn: {
//     marginLeft: 5
//   },
//   card: {
//     borderRadius: 10
//   },
//   errorMessage: {
//     backgroundColor: theme.palette.error.light,
//     borderRadius: 3,
//     color: theme.palette.error.dark,
//     fontSize: '14px',
//     marginBottom: 15,
//     padding: '10px 5px'
//   },
//   logo: {
//     alignItems: 'center',
//     display: 'flex',
//     flex: 1,
//     flexDirection: 'column',
//     marginBottom: 50,
//     marginTop: 30
//   },
//   resend: {
//     color: theme.palette.grey['400'],
//     fontSize: 12,
//     marginTop: 5
//   }
// }));

export const onSubmit = (onConfirm) => (values) => onConfirm(values);

export const onSuccess = (): void => {
};

export const onFailure = (setState) => ({error}): void => {
  const {message} = error;
  const errorMessage: string = message;
  setState({errorMessage});
};

export const ConfirmView = (props: ConfirmViewProps) => {
  const {
    classes,
    onResend = () => { }
  } = props;

  // Initial state
  const [values, setValues] = useState({
    code: '',
    username: ''
  });

  let errorMessage: string;

  useFluxListener(AuthConstants.SIGNIN_SUCCESS, onSuccess);
  useFluxListener(AuthConstants.SIGNIN_FAILED, onFailure(setValues));

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
          <Card className={classes.card}>
            <CardContent>
              {errorMessage ? <div className={classes.errorMessage}>{errorMessage}</div> : null}
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
                      <a onClick={() => onResend(values)}><p className={classes.resend}>Resend code?</p></a>
                    </div>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-xs-auto">
                      <Button className={classes.btn} color="default" size="large" onClick={() => { }} variant="text">
                        Cancel
                      </Button>
                      <Button className={classes.btn} color="primary" size="large" type="submit" variant="contained">
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
