import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import {DropUpload} from './DropUpload.js';

describe('DropUpload', () => {
  beforeEach(() => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:gotham-preview');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders default files and removes them from the preview list', async () => {
    const file = new File(['hello'], 'avatar.png', {type: 'image/png'});
    const onFilesChange = vi.fn();

    render(<DropUpload defaultFiles={[file]} onFilesChange={onFilesChange} />);

    expect(screen.getByText('avatar.png')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: 'Remove avatar.png'}));

    await waitFor(() => expect(onFilesChange).toHaveBeenCalledWith([], []));
  });

  it('adds accepted files from the file input', async () => {
    const file = new File(['hello'], 'notes.txt', {type: 'text/plain'});
    const onFilesChange = vi.fn();

    render(<DropUpload accept=".txt" onFilesChange={onFilesChange} />);

    fireEvent.change(screen.getByLabelText('browse'), {target: {files: [file]}});

    await waitFor(() => expect(onFilesChange).toHaveBeenCalledWith(
      [file],
      [expect.objectContaining({file})]
    ));
  });

  it('rejects files that do not match accept rules', async () => {
    const file = new File(['hello'], 'notes.txt', {type: 'text/plain'});
    const onReject = vi.fn();

    render(<DropUpload accept="image/*" onReject={onReject} />);

    fireEvent.change(screen.getByLabelText('browse'), {target: {files: [file]}});

    await waitFor(() => expect(onReject).toHaveBeenCalledWith([
      {file, reason: 'type'}
    ]));
  });

  it('rejects files when max file count is reached', async () => {
    const small = new File(['a'], 'small.txt', {type: 'text/plain'});
    const large = new File(['too-large'], 'large.txt', {type: 'text/plain'});
    const onReject = vi.fn();

    render(
      <DropUpload
        defaultFiles={[small]}
        maxFiles={1}
        onReject={onReject}
      />
    );

    fireEvent.change(screen.getByLabelText('browse'), {target: {files: [large]}});

    await waitFor(() => expect(onReject).toHaveBeenCalledWith([
      {file: large, reason: 'max-files'}
    ]));
  });

  it('handles drag and keyboard file picker interactions', () => {
    const {container} = render(<DropUpload helperText="PNG or JPG" />);
    const dropZone = screen.getByRole('button');
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const click = vi.spyOn(input, 'click').mockImplementation(() => undefined);

    fireEvent.dragOver(dropZone);
    expect(dropZone).toHaveClass('border-primary');

    fireEvent.dragLeave(dropZone);
    fireEvent.keyDown(dropZone, {key: 'Enter'});

    expect(screen.getByText('PNG or JPG')).toBeInTheDocument();
    expect(click).toHaveBeenCalledTimes(1);
  });
});
