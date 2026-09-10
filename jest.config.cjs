module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^react-router$': '<rootDir>/src/__mocks__/react-router.tsx',
    '^react-router-dom$': '<rootDir>/src/__mocks__/react-router.tsx',
    '^lucide-react$': '<rootDir>/node_modules/lucide-react/dist/cjs/lucide-react.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__tests__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2)$': '<rootDir>/src/__tests__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: {
          target: 'ES2022',
          jsx: 'react-jsx',
          module: 'commonjs',
          moduleResolution: 'node',
          esModuleInterop: true,
          skipLibCheck: true,
          allowJs: true,
        },
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
};
