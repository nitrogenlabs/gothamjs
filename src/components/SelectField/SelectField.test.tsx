import {fireEvent, render, screen, within} from '@testing-library/react';

import {SelectField} from './SelectField.js';

const options = [
  {id: 'draft', label: 'Draft', value: 'draft'},
  {id: 'published', label: 'Published', value: 'published'}
];

describe('SelectField', () => {
  afterEach(() => {
    vi.mocked(window.matchMedia).mockReturnValue({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn()
    });
  });

  it('renders the selected value and hidden select', () => {
    const {container} = render(<SelectField defaultValue="draft" label="Status" name="status" options={options} />);

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getAllByText('Draft')).toHaveLength(2);
    expect(container.querySelector('select[name="status"]')).toHaveValue('draft');
  });

  it('updates the hidden select value', () => {
    const {container} = render(<SelectField defaultValue="draft" label="Status" name="status" options={options} />);

    const hiddenSelect = container.querySelector('select[name="status"]') as HTMLSelectElement;
    fireEvent.change(hiddenSelect, {target: {value: 'published'}});

    expect(hiddenSelect).toHaveValue('published');
    expect(screen.getAllByText('Published')).toHaveLength(2);
  });

  it('renders native select on mobile', () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: true,
      media: '(max-width: 767px)',
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn()
    });

    render(<SelectField defaultValue="draft" label="Status" name="status" options={options} />);

    const select = screen.getByRole('combobox');
    expect(within(select).getByRole('option', {name: 'Draft'})).toBeInTheDocument();
  });
});
