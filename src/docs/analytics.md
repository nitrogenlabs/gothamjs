# AWS RUM Analytics

GothamJS emits analytics through its browser analytics channel by default. When an application is wrapped by both Gotham and Metropolis, Metropolis automatically receives these events and delivers them to Reaktor. Gotham does not load an analytics SDK or send network requests by itself.

For local demos or troubleshooting, use the debug adapter to inspect the exact event passed to the analytics client:

```tsx
import {createAwsRumDebugClient} from '@nlabs/gothamjs';

const awsRum = createAwsRumDebugClient({
  enabled: import.meta.env.DEV,
  target: metropolisAwsRum
});
```

When enabled, the adapter logs `[GothamJS] awsRum.track` and the event object. If a `target` is supplied, the same object is then forwarded for Metropolis delivery. Omitting `target` is useful for a console-only component demo.

## Plug-and-play configuration

```tsx
import {Gotham} from '@nlabs/gothamjs';
import {Metropolis} from '@nlabs/metropolisjs';

root.render(
  <Metropolis config={metropolisConfig}>
    <Gotham config={{routes}} />
  </Metropolis>
);
```

Set an application name and the shared Reaktor endpoint in Metropolis. The application name becomes the default analytics `appId`; `app.rum.appId` can override it:

```ts
const metropolisConfig = {
  production: {
    app: {
      api: {
        rum: 'https://analytics.example.com/public'
      },
      name: 'my-app',
      rum: {
        respectPrivacySignals: true
      }
    }
  }
};
```

If `app.api.rum` is omitted, Metropolis uses its configured public endpoint. Every application uses the same endpoint and supplies its own `appId`. This allows a future dashboard to filter the shared log collection by application.

## Page views

Gotham automatically calls `awsRum.track()` once when the route changes. Add stable analytics metadata so dynamic identifiers and titles never become dimensions:

```tsx
const routes = [{
  analytics: {route: '/stories/:storyId', title: 'Story', viewId: 'story.detail'},
  element: <StoryView />,
  path: 'stories/:storyId'
}];
```

## View performance

Use one terminal measurement instead of separate start/end beacons. Gotham emits `view_performance` with `durationMs`, `outcome`, and `viewId`; Metropolis handles delivery.

```tsx
import {useViewPerformance} from '@nlabs/gothamjs';

useViewPerformance({
  route: '/stories/:storyId',
  status: error ? 'failure' : loading ? 'pending' : 'success',
  title: 'Story',
  viewId: 'story.detail'
});
```

For non-React lifecycles, call `startView()` and finish the returned handle with `succeed()`, `fail()`, `timeout()`, or `cancel()`.

## Clicks and custom events

Only explicitly named interactions are tracked:

```tsx
import {useAwsRum} from '@nlabs/gothamjs';

export const SignupButton = () => {
  const awsRum = useAwsRum();

  const onClick = () => {
    awsRum?.track({
      name: 'signup_started',
      path: window.location.pathname,
      properties: {placement: 'header'},
      type: 'click'
    });
  };

  return <button onClick={onClick}>Sign up</button>;
};
```

Properties must be strings, numbers, or booleans. Do not include names, email addresses, form values, account IDs, query strings, or other identifying information.

## Delivery behavior

Metropolis:

- Generates a memory-only journey ID that resets with the application runtime.
- Adds an event ID, timestamp, and sequence number.
- Suppresses identical events during the deduplication window.
- Debounces events into batches.
- Throttles requests to the shared endpoint.
- Sends JSON through Rip-Hunter.
- Dispatches `AWS_RUM_TRACK_QUEUED`, `AWS_RUM_TRACK_SUCCESS`, and `AWS_RUM_TRACK_ERROR` Flux events.

The shared Reaktor mutation stores standalone `logs` documents. Each document contains `appId`; no graph edge is required.
