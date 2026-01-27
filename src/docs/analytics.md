# Google Analytics Integration

GothamJS provides built-in Google Analytics support, making it easy to track user behavior, page views, and custom events in your application with minimal configuration.

## Features

- **Easy Setup**: Configure Google Analytics with a simple configuration object
- **Lazy Loading**: Analytics script is loaded asynchronously to avoid blocking initial page render
- **Auto Page-View Tracking**: Automatically tracks page views when users navigate between routes
- **Manual Event Tracking**: Track custom events, clicks, and user interactions
- **React Hook**: Convenient `useAnalytics()` hook for use in React components
- **Event Queuing**: Events fired before initialization are queued and sent once ready
- **Privacy Features**: Built-in support for IP anonymization
- **Debug Mode**: Enable debug logging for development and testing
- **SSR Safe**: Gracefully handles server-side rendering scenarios
- **Enabled/Disabled Toggle**: Easy to disable analytics in development or based on user consent

## Installation and Setup

### 1. Configure Google Analytics

Add the Google Analytics configuration to your GothamJS config:

```jsx
import {Gotham} from '@nlabs/gothamjs';

const config = {
  app: {
    name: 'my-app',
    title: 'My Application'
  },
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX', // Your Google Analytics Measurement ID
    anonymizeIp: true,                  // Enable IP anonymization (recommended for GDPR)
    enabled: true,                      // Enable/disable analytics
    debug: false                        // Enable debug logging (for development)
  },
  routes: [
    // Your routes...
  ]
};

const root = createRoot(document.getElementById('root'));
root.render(<Gotham config={config} />);
```

### 2. Get Your Google Analytics Measurement ID

To find your Google Analytics Measurement ID:

1. Sign in to your [Google Analytics account](https://analytics.google.com/)
2. Go to Admin → Data Streams
3. Select your web data stream
4. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `adStorage` | `'granted' \| 'denied'` | `'denied'` | Consent mode for advertising storage |
| `analyticsStorage` | `'granted' \| 'denied'` | `'granted'` | Consent mode for analytics storage |
| `anonymizeIp` | `boolean` | `false` | Enable IP anonymization for privacy compliance (GDPR) |
| `debug` | `boolean` | `false` | Enable debug logging to console |
| `enabled` | `boolean` | `true` | Enable or disable analytics tracking |
| `googleAnalyticsId` | `string` | `undefined` | Your Google Analytics Measurement ID (required to enable analytics) |

### Example Configuration

```jsx
// Development environment with debug mode
const devConfig = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    enabled: true,
    debug: true
  }
};

// Production environment with IP anonymization and consent mode
const prodConfig = {
  googleAnalytics: {
    adStorage: 'denied',
    analyticsStorage: 'granted',
    debug: false,
    enabled: true,
    anonymizeIp: true,
    googleAnalyticsId: 'G-XXXXXXXXXX'
  }
};

// Disabled for testing
const testConfig = {
  googleAnalytics: {
    enabled: false
  }
};
```

## Auto Page-View Tracking

GothamJS automatically tracks page views when users navigate between routes. No additional code is required - just configure the `googleAnalytics` option in your config.

```jsx
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    enabled: true
  },
  routes: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/products/:id',
      element: <ProductPage />
    }
  ]
};
```

When a user navigates from `/` to `/about` to `/products/123`, page views are automatically tracked for each route change.

## Manual Event Tracking

### Track Custom Events

Use the `trackEvent` function to track custom events throughout your application:

```jsx
import {trackEvent} from '@nlabs/gothamjs';

const handleSignup = () => {
  // Track the signup event
  trackEvent('signup', {
    method: 'email',
    plan: 'premium'
  });

  // Your signup logic...
};

const handlePurchase = () => {
  trackEvent('purchase', {
    product_id: '12345',
    price: 49.99,
    currency: 'USD'
  });
};

const handleDownload = () => {
  trackEvent('download', {
    file_name: 'whitepaper.pdf',
    category: 'resources'
  });
};
```

### Track Click Events

Use the `trackClick` function for tracking user clicks on specific elements:

```jsx
import {Button, trackClick} from '@nlabs/gothamjs';

const MyComponent = () => {
  const handleCtaClick = () => {
    trackClick('CTA Button', {
      location: 'header',
      variant: 'primary'
    });
  };

  const handleNavClick = (link) => {
    trackClick('Navigation Link', {
      destination: link,
      section: 'main-nav'
    });
  };

  return (
    <div>
      <Button onClick={handleCtaClick}>Get Started</Button>
      <a href="/pricing" onClick={() => handleNavClick('/pricing')}>
        Pricing
      </a>
    </div>
  );
};
```

### Track Page Views Manually

While page views are tracked automatically, you can also track them manually:

```jsx
import {trackPageView} from '@nlabs/gothamjs';

// Track with custom path and title
trackPageView('/custom-page', 'Custom Page Title');

// Track current page (uses window.location)
trackPageView();
```

## Using the React Hook

The `useAnalytics` hook provides a convenient way to access analytics functions in your React components:

```jsx
import {useAnalytics} from '@nlabs/gothamjs';

const MyComponent = () => {
  const {trackEvent, trackClick, trackPageView, setUserId, setUserProperties} = useAnalytics();

  const handleAction = () => {
    trackEvent('button_click', {
      button_name: 'submit',
      form_type: 'contact'
    });
  };

  const handleElementClick = () => {
    trackClick('Feature Card', {
      card_id: 'advanced-features',
      position: 3
    });
  };

  return (
    <div>
      <button onClick={handleAction}>Submit Form</button>
      <div onClick={handleElementClick}>Feature Card</div>
    </div>
  );
};
```

### Benefits of Using the Hook

- **Memoization**: Functions returned by the hook are memoized for optimal performance
- **No Imports**: Single import for all analytics functions
- **Type Safety**: Full TypeScript support with proper type definitions
- **React Best Practices**: Follows React hooks patterns and conventions

## Integration with Google Tag Manager (GTM)

If you're using Google Tag Manager (GTM) to manage analytics, **do not include both GTM and a separate gtag.js snippet**. This causes duplicate tracking and conflicts.

### Recommended Setup

If you have a GTM container:

1. **Remove the standalone gtag.js snippet** from your HTML:
```html
<!-- Remove this ❌ -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

2. **Keep only the GTM container snippet** in your HTML:
```html
<!-- Keep this ✓ -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXXXXX');</script>
<!-- End Google Tag Manager -->
```

3. **Configure GothamJS without analytics** in your app (GTM will handle all tracking via its tags):
```jsx
const config = {
  // ... other config
  googleAnalytics: {
    enabled: false  // Let GTM handle analytics
  }
};
```

### Why This Matters

- **Prevents duplicate tracking**: Two tracking implementations count the same event twice
- **Fixes DebugView**: GTM's DebugView only sees data from GTM's tags
- **Simplifies setup**: One source of truth for analytics configuration
- **Better event management**: Configure all events in GTM UI, not in code

### Alternative: Use GothamJS Analytics Without GTM

If you're not using GTM, GothamJS analytics is self-contained:

```jsx
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    enabled: true
  }
};
```

No additional gtag snippets or GTM containers needed.

## Advanced Usage

### Setting User ID

Track specific users across sessions by setting a user ID:

```jsx
import {setUserId, useAnalytics} from '@nlabs/gothamjs';

// Using the function directly
const handleLogin = (user) => {
  setUserId(user.id);
  // Continue with login logic...
};

// Using the hook
const LoginComponent = () => {
  const {setUserId} = useAnalytics();

  const handleLogin = async (credentials) => {
    const user = await loginUser(credentials);
    setUserId(user.id);
  };

  return <LoginForm onSubmit={handleLogin} />;
};
```

### Setting User Properties

Track custom user properties for better segmentation:

```jsx
import {setUserProperties, useAnalytics} from '@nlabs/gothamjs';

// Using the function directly
setUserProperties({
  plan: 'premium',
  country: 'US',
  signup_date: '2024-01-15',
  preferred_language: 'en'
});

// Using the hook
const ProfileComponent = () => {
  const {setUserProperties} = useAnalytics();

  const updateProfile = (profile) => {
    setUserProperties({
      account_type: profile.type,
      industry: profile.industry,
      team_size: profile.teamSize
    });
  };

  return <ProfileForm onUpdate={updateProfile} />;
};
```

### Conditional Tracking Based on User Consent

Respect user privacy by enabling analytics only after consent:

```jsx
import {useEffect, useState} from 'react';
import {Gotham} from '@nlabs/gothamjs';

const App = () => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check for existing consent in localStorage
    const consent = localStorage.getItem('analytics-consent');
    setHasConsent(consent === 'true');
  }, []);

  const config = {
    app: {
      name: 'my-app',
      title: 'My Application'
    },
    googleAnalytics: {
      googleAnalyticsId: 'G-XXXXXXXXXX',
      anonymizeIp: true,
      enabled: hasConsent  // Only enable if user has given consent
    },
    routes: [
      // Your routes...
    ]
  };

  return <Gotham config={config} />;
};
```

## Privacy Considerations

### Consent Mode

Enable Google Analytics Consent Mode to respect user privacy choices:

```jsx
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    analyticsStorage: 'granted',  // Allow analytics data collection
    adStorage: 'denied'           // Deny advertising data collection
  }
};
```

Consent values:
- `'granted'`: Allow data collection for this storage type
- `'denied'`: Deny data collection for this storage type

### IP Anonymization

Enable IP anonymization to comply with GDPR and other privacy regulations:

```jsx
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    anonymizeIp: true  // Anonymizes the last octet of the user's IP address
  }
};
```

### User Consent

Always obtain user consent before tracking, especially in regions with strict privacy laws:

```jsx
const CookieConsent = ({onAccept, onDecline}) => {
  return (
    <div className="cookie-banner">
      <p>We use cookies and analytics to improve your experience.</p>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onDecline}>Decline</button>
    </div>
  );
};

const App = () => {
  const [config, setConfig] = useState({
    googleAnalytics: {enabled: false}
  });

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'true');
    setConfig({
      googleAnalytics: {
        googleAnalyticsId: 'G-XXXXXXXXXX',
        anonymizeIp: true,
        enabled: true
      }
    });
  };

  return <Gotham config={config} />;
};
```

### Disabling Analytics

Disable analytics in specific environments or based on user preferences:

```jsx
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    enabled: process.env.NODE_ENV === 'production'  // Only in production
  }
};

// Or based on user preference
const userPreferences = getUserPreferences();
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    enabled: userPreferences.allowAnalytics
  }
};
```

## Debugging and Testing

### Enable Debug Mode

Turn on debug mode to see analytics events in the console:

```jsx
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    debug: true  // Enable console logging
  }
};
```

Debug output will show:
- Initialization status
- Script loading events
- Queued events
- Tracked events with parameters
- Page view tracking
- User ID and property updates

### Testing in Development

```jsx
// Development configuration
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    debug: true,
    enabled: true  // Enable to test tracking
  }
};

// Test event tracking
import {trackEvent} from '@nlabs/gothamjs';

const testAnalytics = () => {
  console.log('Testing analytics...');
  trackEvent('test_event', {test: true});
};
```

### Verify in Google Analytics

After implementing analytics, verify that events are being tracked:

1. Go to your Google Analytics dashboard
2. Navigate to Reports → Realtime
3. Interact with your application
4. Verify events appear in real-time reporting

## Best Practices

### 1. Use Meaningful Event Names

Choose clear, consistent event names that describe user actions:

```jsx
// Good ✓
trackEvent('purchase_completed', {product_id: '123', amount: 49.99});
trackEvent('signup_started', {method: 'email'});
trackEvent('video_played', {video_id: 'intro-tour'});

// Avoid ✗
trackEvent('event1', {data: 'something'});
trackEvent('click', {stuff: 'things'});
```

### 2. Include Relevant Parameters

Add context to events with meaningful parameters:

```jsx
trackEvent('search', {
  search_term: query,
  results_count: results.length,
  category: selectedCategory,
  filters_applied: activeFilters.length
});
```

### 3. Track Key User Journeys

Identify and track important user flows:

```jsx
// Onboarding flow
trackEvent('onboarding_started');
trackEvent('profile_completed');
trackEvent('first_project_created');
trackEvent('onboarding_completed');

// Purchase flow
trackEvent('product_viewed', {product_id});
trackEvent('added_to_cart', {product_id, price});
trackEvent('checkout_started', {cart_value});
trackEvent('payment_completed', {amount, method});
```

### 4. Avoid Tracking Sensitive Data

Never send personally identifiable information (PII) or sensitive data:

```jsx
// Don't do this ✗
trackEvent('form_submitted', {
  email: 'user@example.com',  // PII
  credit_card: '1234-5678-9012-3456',  // Sensitive
  password: 'secret123'  // Sensitive
});

// Do this instead ✓
trackEvent('form_submitted', {
  form_type: 'contact',
  has_email: true,
  fields_completed: 5
});
```

### 5. Keep Event Structure Consistent

Use consistent parameter names across similar events:

```jsx
// Consistent naming ✓
trackEvent('product_viewed', {product_id: '123', category: 'electronics'});
trackEvent('product_added', {product_id: '123', category: 'electronics', quantity: 1});
trackEvent('product_purchased', {product_id: '123', category: 'electronics', price: 99.99});
```

## Troubleshooting

### Analytics Not Working

**Problem**: Events are not showing up in Google Analytics.

**Solutions**:
1. Verify your Measurement ID is correct
2. Check that `enabled: true` in configuration
3. Enable debug mode to see console logs
4. Check browser console for errors
5. Verify script is loading in Network tab
6. Allow time for data to appear (can take a few minutes)

```jsx
// Debug configuration
const config = {
  googleAnalytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    enabled: true,
    debug: true  // Check console for analytics activity
  }
};
```

### Events Not Being Tracked

**Problem**: Analytics initialized but specific events not tracked.

**Solutions**:
1. Ensure functions are called after initialization
2. Check event names and parameters are valid
3. Verify analytics is not disabled
4. Check for JavaScript errors preventing execution

```jsx
// Verify analytics is working
import {trackEvent} from '@nlabs/gothamjs';

const testTracking = () => {
  console.log('Testing event tracking...');
  trackEvent('test_event', {timestamp: Date.now()});
  console.log('Event sent');
};
```

### Script Loading Errors

**Problem**: Google Analytics script fails to load.

**Solutions**:
1. Check internet connectivity
2. Verify firewall/ad blocker isn't blocking the script
3. Check browser console for network errors
4. Ensure `gtag.js` domain is not blocked

### Page Views Not Auto-Tracked

**Problem**: Navigation occurs but page views aren't tracked.

**Solutions**:
1. Verify Google Analytics is configured in GothamProvider
2. Check that routes are defined correctly
3. Enable debug mode to see navigation events
4. Ensure flux is properly initialized

## API Reference

### `initializeAnalytics(config: GoogleAnalyticsConfig): void`

Initializes Google Analytics with the provided configuration. Called automatically by GothamProvider.

```tsx
initializeAnalytics({
  googleAnalyticsId: 'G-XXXXXXXXXX',
  anonymizeIp: true,
  enabled: true,
  debug: false
});
```

### `trackPageView(path?: string, title?: string): void`

Tracks a page view. Auto-detects current page if parameters are not provided.

```tsx
trackPageView();  // Uses window.location.pathname and document.title
trackPageView('/custom-path', 'Custom Page Title');
```

### `trackEvent(eventName: string, params?: Record<string, unknown>): void`

Tracks a custom event with optional parameters.

```tsx
trackEvent('button_click', {button_name: 'signup', location: 'header'});
```

### `trackClick(elementName: string, params?: Record<string, unknown>): void`

Tracks a click event. Convenience wrapper around `trackEvent`.

```tsx
trackClick('CTA Button', {location: 'hero', variant: 'primary'});
```

### `setUserId(userId: string): void`

Sets the user ID for tracking specific users across sessions.

```tsx
setUserId('user-12345');
```

### `setUserProperties(properties: Record<string, unknown>): void`

Sets custom user properties for segmentation and analysis.

```tsx
setUserProperties({plan: 'premium', country: 'US', industry: 'technology'});
```

### `useAnalytics(): AnalyticsHook`

React hook that returns all analytics functions.

```tsx
const {trackEvent, trackClick, trackPageView, setUserId, setUserProperties} = useAnalytics();
```

Returns an object with:
- `trackPageView: (path?: string, title?: string) => void`
- `trackEvent: (eventName: string, params?: Record<string, unknown>) => void`
- `trackClick: (elementName: string, params?: Record<string, unknown>) => void`
- `setUserId: (userId: string) => void`
- `setUserProperties: (properties: Record<string, unknown>) => void`

## TypeScript Types

### `GoogleAnalyticsConfig`

```typescript
interface GoogleAnalyticsConfig {
  readonly googleAnalyticsId?: string;
  readonly anonymizeIp?: boolean;
  readonly enabled?: boolean;
  readonly debug?: boolean;
}
```

### `AnalyticsHook`

```typescript
interface AnalyticsHook {
  readonly trackPageView: (path?: string, title?: string) => void;
  readonly trackEvent: (eventName: string, params?: Record<string, unknown>) => void;
  readonly trackClick: (elementName: string, params?: Record<string, unknown>) => void;
  readonly setUserId: (userId: string) => void;
  readonly setUserProperties: (properties: Record<string, unknown>) => void;
}
```

## Learn More

- [Google Analytics Documentation](https://developers.google.com/analytics)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GDPR Compliance](https://support.google.com/analytics/answer/9019185)
- [GothamJS Documentation](./gettingStarted.md)
