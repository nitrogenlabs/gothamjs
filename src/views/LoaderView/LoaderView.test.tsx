import {render, screen} from '@testing-library/react';

import {LoaderView, toggleLoader} from './LoaderView.js';

vi.mock('@nlabs/arkhamjs-utils-react', async () => {
  const React = await import('react');

  return {
    useFluxListener: vi.fn((_eventName, callback) => {
      React.useEffect(() => {
        callback({content: 'Loading projects', isLoading: true});
      }, [callback]);
    })
  };
});

describe('LoaderView', () => {
  it('renders loader content when the loading event is active', () => {
    render(<LoaderView />);

    expect(screen.getByText('Loading projects')).toBeInTheDocument();
  });

  it('updates external loader state through toggleLoader', () => {
    const setLoading = vi.fn();
    const setLoaderContent = vi.fn();

    toggleLoader(setLoading, setLoaderContent)({
      content: 'Saving',
      isLoading: true
    });

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setLoaderContent).toHaveBeenCalledWith('Saving');
  });
});
