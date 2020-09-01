/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import {useFlux, useState} from '@nlabs/arkhamjs-utils-react';
import * as React from 'react';

import {Form} from '../../components/Form/Form';
import {TextField} from '../../components/Form/TextField';
import {PageHeader} from '../../components/PageHeader/PageHeader';
import {LoginConstants} from '../../constants/LoginConstants';
import {PageView} from '../PageView/PageView';
import {ConfirmViewProps} from './Confirm.types';

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

export const onSubmit = (props, state) => {
  const {onConfirm} = props;
  const {confirmation} = state;
  onConfirm(confirmation);
};

export const onSuccess = (): void => {
};

export const onFailure = (setState) => ({error}): void => {
  const {message} = error;
  const errorMessage: string = message;
  setState({errorMessage});
};

export const renderMessage = (props, message: string): JSX.Element => {
  if(message) {
    const {classes} = props;
    return <div className={classes.errorMessage}>{message}</div>;
  }

  return null;
};

export const ConfirmView = (props: ConfirmViewProps) => {
  const {
    classes,
    onResend = () => {}
  } = props;

  // Initial state
  const [state, setState] = useState({
    confirmation: {
      code: '',
      username: ''
    },
    errorMessage: null
  });
  const {confirmation, errorMessage} = state;

  useFlux(LoginConstants.SUCCESS, onSuccess);
  useFlux(LoginConstants.FAILED, onFailure(setState));

  return (
    <PageView name={name} title="Confirmation">
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
              {renderMessage(props, errorMessage)}
              <Form
                onSubmit={onSubmit(props, state)}
                initialValues={confirmation}
                validateOnBlur>
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
                      <a onClick={() => onResend(confirmation)}><p className={classes.resend}>Resend code?</p></a>
                    </div>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-xs-auto">
                      <Button className={classes.btn} color="default" size="large" onClick={() => {}} variant="text">
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
