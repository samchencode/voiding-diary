import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import { defaults } from 'ts-jest/presets';

const config: Config.InitialOptions = {
  ...defaults,
  preset: 'jest-expo',
  verbose: true,
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      babelConfig: true,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist']
};

export default config;
