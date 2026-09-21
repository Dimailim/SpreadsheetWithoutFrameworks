import {defineConfig} from 'jest';

export default defineConfig({
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@/(.*)': '<rootDir>/src/$1',
  }
});
