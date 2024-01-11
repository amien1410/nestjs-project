export default {
  // Set the display name for the test suite
  displayName: 'admin-api',

  // Global configuration options for ts-jest
  globals: {
    'ts-jest': {
      // Specify the tsconfig file for ts-jest
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },

  // Define file transformations for Jest
  transform: {
    // Use ts-jest for TypeScript and JavaScript files
    '^.+\\.[tj]s$': 'ts-jest',
  },

  // Specify module file extensions
  moduleFileExtensions: ['ts', 'js', 'html'],

  // Set the coverage directory
  coverageDirectory: '../../coverage/apps/admin-api',

  // Use the Jest preset configuration file
  preset: '../../jest.preset.js',

  // Optional: Add reporters, setupFiles, or other Jest configurations if needed
  // ...

  // Error handling for potential issues with the configuration
  // Handle any errors that might occur during the configuration process
  throws: true,

  // Show helpful debug information
  verbose: true,
};
