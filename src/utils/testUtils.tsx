/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux} from '@nlabs/arkhamjs';
import {FluxProvider} from '@nlabs/arkhamjs-utils-react';
import {render, screen, waitFor} from '@nlabs/lex/test-react';
import {Form} from 'react-hook-form';
import {MemoryRouter} from 'react-router';

import type {FormSubmitHandler} from 'react-hook-form';

export const getTestElement = (name: string, index: number = 0) => screen.queryAllByTestId(name)[index];

export const renderWithProvider: any = async (Element, props = {}) => {
  const {
    mockRoute = '/',
    ...restProps
  }: Record<string, unknown> = props;
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

interface RenderFormProps {
  mocks?: unknown;
  onSubmit?: FormSubmitHandler<undefined>;
  [key: string]: unknown;
}

export const renderWithForm: any = async (Element, props: RenderFormProps = {}) => {
  const {
    mocks,
    onSubmit = () => {},
    ...restProps
  } = props;

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
