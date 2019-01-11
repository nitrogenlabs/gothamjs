/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';

import {Form} from '../components/Form/Form';
import {TextField} from '../components/Form/TextField';
import {PageHeader} from '../components/PageHeader';
import {LoginConstants} from '../constants/LoginConstants';
import {ConfirmViewProps, ConfirmViewState} from '../types/views/confirm';
import {initComponent} from '../utils/components';
import {PageView} from './PageView';

const styles: StyleRulesCallback = (theme) => ({
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
  logo: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 50,
    marginTop: 30
  },
  resend: {
    color: theme.palette.grey['400'],
    fontSize: 12,
    marginTop: 5
  }
});

export class ConfirmViewBase extends React.PureComponent<ConfirmViewProps, ConfirmViewState> {
  state: any = {};

  constructor(props) {
    super(props);

    // Methods
    this.onFailure = this.onFailure.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);

    // Initial state
    this.state = {
      confirmation: {
        code: '',
        username: ''
      },
      errorMessage: null
    };
  }

  componentDidMount(): void {
    const {Flux} = this.props;

    // Add listeners
    Flux.on(LoginConstants.SUCCESS, this.onSuccess);
    Flux.on(LoginConstants.FAILED, this.onFailure);
  }

  componentWillUnmount(): void {
    const {Flux} = this.props;

    // Remove listeners
    Flux.off(LoginConstants.SUCCESS, this.onSuccess);
    Flux.off(LoginConstants.FAILED, this.onFailure);
  }

  onSubmit() {
    const {onConfirm} = this.props;
    const {confirmation} = this.state;
    onConfirm(confirmation);
  }

  onSuccess(): void {
  }

  onFailure({error}): void {
    const {message} = error;
    const errorMessage: string = message;
    this.setState({errorMessage});
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
      onResend = () => {}
    } = this.props;
    const {confirmation, errorMessage} = this.state;

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
                {this.renderMessage(errorMessage)}
                <Form
                  onSubmit={this.onSubmit}
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
  }
}

export const ConfirmView = initComponent(module, ConfirmViewBase, styles);
export default ConfirmView;
