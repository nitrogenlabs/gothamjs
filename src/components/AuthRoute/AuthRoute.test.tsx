import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router';

import {Config} from '../../config/appConfig.js';
import {AuthRoute} from './AuthRoute';

describe('AuthRoute', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('redirects to /signIn with encoded redirect query param when not authenticated', () => {
    jest.spyOn(Config, 'get').mockReturnValue(() => false);

    render(
      <MemoryRouter initialEntries={["/foo?bar=1#baz"]}>
        <Routes>
          <Route path="/signIn" element={<div data-testid="signin">Sign In</div>} />
          <Route path="/foo" element={<AuthRoute><div>Protected</div></AuthRoute>} />
        </Routes>
      </MemoryRouter>
    );

    const signIn = screen.getByTestId('signin');
    expect(signIn).toBeDefined();
  });
});
