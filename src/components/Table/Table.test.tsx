/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import {render, screen} from '@testing-library/react';

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from './Table.js';

describe('Table', () => {
  it('renders table sections and linked rows', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow href="/projects/1" title="Open GothamJS">
            <TableCell>GothamJS</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole('columnheader', {name: 'Name'})).toBeInTheDocument();
    expect(screen.getByText('GothamJS')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Open GothamJS'})).toHaveAttribute('href', '/projects/1');
  });
});
