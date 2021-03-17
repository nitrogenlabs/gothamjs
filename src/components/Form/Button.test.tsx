import {getTestElement, renderWithForm} from '../../utils/testUtils';
import {Button, ButtonProps} from './Button';

describe('Button', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render', async () => {
    const props: ButtonProps = {
      label: 'Test'
    };

    await renderWithForm(Button, props);

    const button = getTestElement('button-Test');
    expect(button).toBeInTheDocument();
  });
});
