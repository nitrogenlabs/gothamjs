import type { Preview } from "@storybook/react";
import React from "react";
import {Gotham} from '../src/views/Gotham/Gotham';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Gotham>
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
      </Gotham>
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
