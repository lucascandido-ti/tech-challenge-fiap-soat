const { name } = require('./package.json');

const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    name,
    displayName: name,
    collectCoverageFrom: ['**/*.(controller|use-case|repository|service|provider|guard|pipe|interceptor|filter).(t|j)s'],
    coverageDirectory: 'coverage',
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'node',
    clearMocks: true,
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
    projects: ['<rootDir>/**/jest.config.js'],
    transform: {
        ...tsjPreset.transform,
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.js$': 'babel-jest'
    },
    testRegex: '.e2e-spec.ts$',
};
  