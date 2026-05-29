import {fireEvent, render, screen} from '@testing-library/react';

import {MediaLightbox, MediaLightboxCloseButton, MediaLightboxNavButton} from './MediaLightbox.js';

const close = vi.fn();
const next = vi.fn();
const prev = vi.fn();
let navigationState = {
  nextDisabled: false,
  prevDisabled: false
};

vi.mock('yet-another-react-lightbox', () => ({
  default: vi.fn(({open, plugins, render}) => open ? (
    <div data-plugin-count={plugins.length} role="dialog">
      {render.buttonClose()}
      {render.buttonPrev()}
      {render.buttonNext()}
    </div>
  ) : null),
  useController: () => ({close, next, prev}),
  useNavigationState: () => navigationState
}));

vi.mock('yet-another-react-lightbox/plugins/video', () => ({
  default: 'video-plugin'
}));

describe('MediaLightbox', () => {
  beforeEach(() => {
    close.mockClear();
    next.mockClear();
    prev.mockClear();
    navigationState = {
      nextDisabled: false,
      prevDisabled: false
    };
  });

  it('renders close and navigation controls for multiple slides', () => {
    render(<MediaLightbox enableVideo open slides={[{src: 'one.jpg'}, {src: 'two.jpg'}]} />);

    expect(screen.getByRole('dialog')).toHaveAttribute('data-plugin-count', '1');

    fireEvent.click(screen.getByRole('button', {name: 'Close'}));
    fireEvent.click(screen.getByRole('button', {name: 'Previous'}));
    fireEvent.click(screen.getByRole('button', {name: 'Next'}));

    expect(close).toHaveBeenCalledTimes(1);
    expect(prev).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('hides navigation for a single slide when requested', () => {
    render(<MediaLightbox hideNavigationWhenSingle open slides={[{src: 'one.jpg'}]} />);

    expect(screen.getByRole('button', {name: 'Close'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Previous'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Next'})).not.toBeInTheDocument();
  });

  it('disables nav buttons when lightbox navigation is disabled', () => {
    navigationState = {
      nextDisabled: true,
      prevDisabled: true
    };

    render(
      <>
        <MediaLightboxNavButton direction="prev" />
        <MediaLightboxNavButton direction="next" />
        <MediaLightboxCloseButton />
      </>
    );

    expect(screen.getByRole('button', {name: 'Previous'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Next'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Close'})).not.toBeDisabled();
  });
});
