import {getTestElement, renderWithProvider} from '../../utils/testUtils';
import {Form, FormProps} from './Form';

describe('Form', () => {
  it('should render', async () => {
    const props: FormProps = {
      children: null,
      onSubmit: jest.fn()
    };

    await renderWithProvider(Form, props);

    const form = getTestElement('form');
    expect(form).toBeInTheDocument();
  });
});
