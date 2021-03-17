import * as reactHookForm from 'react-hook-form';

import {getTestElement, renderWithForm} from '../../utils/testUtils';
import {TextField, TextFieldProps} from './TextField';

describe('TextField', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render', async () => {
    const props: TextFieldProps = {
      name: 'test'
    };

    await renderWithForm(TextField, props, true);

    const textField = getTestElement('textField-test');
    expect(textField).toBeInTheDocument();
  });
});
