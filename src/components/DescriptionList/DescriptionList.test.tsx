/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {DescriptionDetails, DescriptionList, DescriptionTerm} from './DescriptionList.js';

describe('DescriptionList', () => {
  it('renders terms and details', () => {
    render(
      <DescriptionList>
        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetails>Active</DescriptionDetails>
      </DescriptionList>
    );

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
