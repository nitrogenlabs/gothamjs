// Import Jest DOM for additional matchers
import '@testing-library/jest-dom';
// const execaMock = require('@nlabs/execa-mock');

// jest.mock('execa', execaMock);

// Mock any global objects if needed
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
