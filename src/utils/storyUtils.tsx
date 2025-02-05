import {GothamProvider} from '../views/Gotham/GothamProvider';

export const gothamDecorator = (Story) => (
  <GothamProvider config={{}}>
    <Story />
  </GothamProvider>
);
