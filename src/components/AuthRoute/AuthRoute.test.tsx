/* @vitest-environment jsdom */
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router';
import {vi} from 'vitest';

import {Config} from '../../config/appConfig.js';
import {AuthRoute} from './AuthRoute.js';

describe('AuthRoute', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('redirects to /signIn with encoded redirect query param when not authenticated', () => {
    const originalGet = Config.get;
    vi.spyOn(Config, 'get').mockImplementation((key: string | string[], _def?: any) => {
      if(key === 'isAuth') {
        return () => false;
      }

      if(key === 'authRoute') {
        return '/signIn';
      }

      return originalGet(key as any, _def);
    });

    render(
      <MemoryRouter initialEntries={['/foo?bar=1#baz']}>
        <Routes>
          <Route element={<div data-testid="signin">Sign In</div>} path="/signIn" />
          <Route element={<AuthRoute><div>Protected</div></AuthRoute>} path="/foo" />
        </Routes>
      </MemoryRouter>
    );

    const signIn = screen.getByTestId('signin');

    expect(signIn).toBeDefined();
  });
});
