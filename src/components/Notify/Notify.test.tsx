/* @vitest-environment jsdom */
/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {render} from '@nlabs/lex/test-react';
import '@testing-library/jest-dom/vitest';

import {Notify} from './Notify.js';

describe('Notify', () => {
  it('should render without crashing', () => {
    const {container} = render(<Notify />);

    expect(container).toBeDefined();
  });

  it('should not display notification initially', () => {
    const {queryByRole} = render(<Notify />);

    expect(queryByRole('alert')).not.toBeInTheDocument();
  });

  // Note: Full functionality testing is covered by Storybook stories
  // which test the component with Flux integration
});
