/* @vitest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {Pricing} from './Pricing.js';

describe('Pricing', () => {
  it('renders all tiers in grid variant from the tier array length', () => {
    render(
      <Pricing
        description="Pick a plan"
        tiers={[
          {
            ctaLabel: 'Choose starter',
            href: '/starter',
            id: 'starter',
            name: 'Starter',
            price: '$19',
            priceSuffix: '/month'
          },
          {
            ctaLabel: 'Choose growth',
            featured: true,
            href: '/growth',
            id: 'growth',
            name: 'Growth',
            price: '$49',
            priceSuffix: '/month'
          },
          {
            ctaLabel: 'Choose scale',
            href: '/scale',
            id: 'scale',
            name: 'Scale',
            price: '$99',
            priceSuffix: '/month'
          }
        ]}
        title="Pricing that grows with you"
        variant="grid"
      />
    );

    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Growth')).toBeInTheDocument();
    expect(screen.getByText('Scale')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Choose growth'})).toHaveAttribute('href', '/growth');
  });

  it('switches displayed prices when the frequency toggle changes', () => {
    render(
      <Pricing
        frequencies={[
          {label: 'Monthly', priceSuffix: '/month', value: 'monthly'},
          {label: 'Annually', priceSuffix: '/year', value: 'annually'}
        ]}
        tiers={[
          {
            ctaLabel: 'Buy starter',
            href: '/starter',
            id: 'starter',
            name: 'Starter',
            price: {annually: '$199', monthly: '$19'}
          }
        ]}
        title="Choose a billing cycle"
        variant="grid"
      />
    );

    expect(screen.getByText('$19')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', {name: /annually/i}));
    expect(screen.getByText('$199')).toBeInTheDocument();
  });

  it('renders the comparison layout with section values', () => {
    render(
      <Pricing
        comparisonSections={[
          {
            features: [
              {
                name: 'Custom domains',
                tiers: {Growth: '3', Starter: '1'}
              }
            ],
            name: 'Features'
          }
        ]}
        tiers={[
          {
            ctaLabel: 'Buy starter',
            href: '/starter',
            id: 'starter',
            name: 'Starter',
            price: '$19'
          },
          {
            ctaLabel: 'Buy growth',
            href: '/growth',
            id: 'growth',
            name: 'Growth',
            price: '$49'
          }
        ]}
        title="Compare plans"
        variant="comparison"
      />
    );

    expect(screen.getAllByText('Features').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Custom domains').length).toBeGreaterThan(0);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
  });

  it('renders the single-offer layout', () => {
    render(
      <Pricing
        singleOffer={{
          ctaHref: '/buy',
          ctaLabel: 'Get access',
          featureLabel: 'Included',
          features: ['Private forum access', 'Official member t-shirt'],
          price: '$349',
          priceLabel: 'Pay once, own it forever',
          priceSuffix: 'USD',
          title: 'Lifetime membership'
        }}
        title="Simple no-tricks pricing"
        variant="single"
      />
    );

    expect(screen.getByText('Lifetime membership')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Get access'})).toHaveAttribute('href', '/buy');
    expect(screen.getByText('Private forum access')).toBeInTheDocument();
  });
});
