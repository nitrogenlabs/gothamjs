import { parseRoutes } from './routeUtils';

describe('parseRoutes loader', () => {
  it('adds a loader function for routes with authenticate: true', () => {
    const routes = [
      {
        path: '/',
        routes: [
          { path: '/dashboard', element: {}, authenticate: true }
        ]
      }
    ];

    const parsed = parseRoutes(routes);
    const children = parsed[0].children;
    const dashboard = children.find(r => r.path === 'dashboard');

    expect(dashboard).toBeDefined();
    expect(typeof dashboard.loader).toBe('function');
  });

  it('supports nested routes defined as children (react-router style) and preserves authenticate', () => {
    const routes = [
      {
        path: '/',
        children: [
          { path: 'dashboard', element: {}, authenticate: true }
        ]
      }
    ];

    const parsed = parseRoutes(routes as any);
    const children = parsed[0].children;
    const dashboard = children.find(r => r.path === 'dashboard');

    expect(dashboard).toBeDefined();
    expect(dashboard.authenticate).toBe(true);
    expect(typeof dashboard.loader).toBe('function');
  });
});