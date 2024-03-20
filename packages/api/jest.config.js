const { name } = require('./package.json');

const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  name,
  displayName: name,
  collectCoverageFrom: ['**/*.(controller|service|provider|guard|pipe|interceptor|filter).(t|j)s'],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  projects: undefined,
  moduleNameMapper: {
    '^@curiosity/core/(.*)$': '<rootDir>/../../core/src/$1',
    '^@curiosity/(.*)$': '<rootDir>/../src/modules/curiosity/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
};
