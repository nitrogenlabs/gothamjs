/* @vitest-environment jsdom */
import {render} from '@nlabs/lex/test-react';
import {vi} from 'vitest';

import {GothamContext} from '../../utils/GothamContext.js';

const location = {
  hash: '',
  pathname: '/home',
  search: '',
  state: undefined
};

vi.mock('@nlabs/arkhamjs-utils-react', () => ({
  useFluxListener: vi.fn()
}));

vi.mock('react-router', () => ({
  Outlet: () => <div data-testid="outlet" />,
  useLocation: () => location,
  useNavigate: () => vi.fn()
}));

vi.mock('../../components/Notify/Notify.js', () => ({Notify: () => null}));
vi.mock('../LoaderView/LoaderView.js', () => ({LoaderView: () => null}));

const {GothamRoot} = await import('./GothamRoot.js');

describe('GothamRoot analytics', () => {
  it('calls awsRum.track once for each distinct sanitized route', () => {
    const awsRum = {track: vi.fn()};
    document.title = 'Gotham';
    const value = {Flux: {} as any, awsRum};
    const {rerender} = render(
      <GothamContext.Provider value={value}>
        <GothamRoot />
      </GothamContext.Provider>
    );

    expect(awsRum.track).toHaveBeenCalledWith({
      name: 'page_view',
      path: '/home',
      properties: {title: 'Gotham'},
      type: 'page_view'
    });

    location.search = '?token=private';
    rerender(
      <GothamContext.Provider value={value}>
        <GothamRoot />
      </GothamContext.Provider>
    );
    expect(awsRum.track).toHaveBeenCalledTimes(1);

    location.pathname = '/docs';
    rerender(
      <GothamContext.Provider value={value}>
        <GothamRoot />
      </GothamContext.Provider>
    );
    expect(awsRum.track).toHaveBeenLastCalledWith(expect.objectContaining({path: '/docs'}));
  });
});
