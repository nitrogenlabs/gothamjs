/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux} from '@nlabs/arkhamjs';
import {FluxProvider} from '@nlabs/arkhamjs-utils-react';
import {render, screen, waitFor} from '@testing-library/react';
import {Form} from 'react-hook-form';
import {MemoryRouter} from 'react-router-dom';


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
        <Element {...restProps} />
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
        <Form onSubmit={onSubmit}>
          <Element {...restProps} />
        </Form>
      </MemoryRouter>
    </FluxProvider>
  );

  await waitFor(() => {
    jest.runAllImmediates();
  });

  return wrapper;
};
