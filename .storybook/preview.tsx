import type { Preview } from "@storybook/react";
import React from "react";
import {GothamProvider} from '../src/views/Gotham/GothamProvider';
import {defaultGothamConfig} from '../src/views/Gotham/Gotham';

const preview: Preview = {
  decorators: [
    (Story) => (
      <GothamProvider config={defaultGothamConfig}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100vh",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </GothamProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
