/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';

import {Tabs} from './Tabs.js';

const items = [
  {id: 'account', label: 'Account'},
  {current: true, id: 'team', label: 'Team'},
  {id: 'billing', label: 'Billing'}
];

describe('Tabs', () => {
  it('renders tabs and handles button tabs', () => {
    const onTabChange = vi.fn();
    render(<Tabs items={items} onTabChange={onTabChange} />);

    fireEvent.click(screen.getByRole('button', {name: 'Billing'}));

    expect(screen.getByRole('button', {name: 'Team'})).toHaveAttribute('aria-current', 'page');
    expect(onTabChange).toHaveBeenCalledWith(items[2]);
  });
});
