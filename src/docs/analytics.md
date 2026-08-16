# AWS RUM Analytics

GothamJS emits analytics through an injected `awsRum.track()` client. It does not load an analytics SDK or send network requests by itself.

For local demos or troubleshooting, use the debug adapter to inspect the exact event passed to the analytics client:

```tsx
import {createAwsRumDebugClient} from '@nlabs/gothamjs';

const awsRum = createAwsRumDebugClient({
  enabled: import.meta.env.DEV,
  target: metropolisAwsRum
});
```

When enabled, the adapter logs `[GothamJS] awsRum.track` and the event object. If a `target` is supplied, the same object is then forwarded for Metropolis delivery. Omitting `target` is useful for a console-only component demo.

## Configuration

```tsx
import {Gotham} from '@nlabs/gothamjs';
import {createAction} from '@nlabs/metropolisjs';

const awsRum = createAction('awsRum', flux, {
  appId: 'my-app',
  debounceMs: 250,
  dedupeMs: 1000,
  throttleMs: 1000
});

const config = {
  awsRum,
  routes
};

root.render(<Gotham config={config} />);
```

Metropolis must be configured with the shared Reaktor endpoint:

```ts
const metropolisConfig = {
  production: {
    app: {
      api: {
        rum: 'https://analytics.example.com/public'
      },
      rum: {
        appId: 'my-app'
      }
    }
  }
};
```

Every application uses the same endpoint and supplies its own `appId`. This allows a future dashboard to filter the shared log collection by application.

## Page views

Gotham automatically calls `awsRum.track()` once when the sanitized route pathname changes. Query strings, hashes, and route state are not included.

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

The shared Reaktor mutation stores standalone `rumLogs` documents. Each document contains `appId`; no graph edge is required.
