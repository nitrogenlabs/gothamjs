import {StylesOptions, StylesProvider, ThemeProvider} from '@material-ui/styles';
import {Flux} from '@nlabs/arkhamjs';
import {FluxProvider} from '@nlabs/arkhamjs-utils-react';
import {render, screen, waitFor} from '@testing-library/react';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';

import {Form} from '../components/Form/Form';
import {defaultTheme} from '../config/theme';

export const generateClassName: StylesOptions['generateClassName'] = ({key}, sheet): string =>
  `${sheet!.options.classNamePrefix}-${key}`;

export const getTestElement = (name: string, index: number = 0) => screen.queryAllByTestId(name)[index];

export const renderWithProvider = async (Element, props = {}) => {
  const {
    mockRoute = '/',
    ...restProps
  }: any = props;
  Flux.init();
  jest.useFakeTimers();

  const wrapper = render(
    <FluxProvider flux={Flux} >
      <MemoryRouter initialEntries={[mockRoute]} initialIndex={0} >
        <StylesProvider generateClassName={generateClassName} >
          <ThemeProvider theme={defaultTheme} >
            <SnackbarProvider>
              <Element {...restProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </StylesProvider>
      </MemoryRouter>
    </FluxProvider>
  );

  await waitFor(() => {
    jest.runAllImmediates();
  });

  return wrapper;
};


export const renderWithForm = async (Element, props = {}) => {
  const {
    mocks,
    onSubmit = () => { },
    ...restProps
  }: any = props;

  jest.useFakeTimers();

  const wrapper = render(
    <FluxProvider flux={Flux}>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <StylesProvider generateClassName={generateClassName}>
          <ThemeProvider theme={defaultTheme}>
            <SnackbarProvider>
              <Form onSubmit={onSubmit}>
                <Element {...restProps} />
              </Form>
            </SnackbarProvider>
          </ThemeProvider>
        </StylesProvider>
      </MemoryRouter>
    </FluxProvider>
  );

  await waitFor(() => {
    jest.runAllImmediates();
  });

  return wrapper;
};
