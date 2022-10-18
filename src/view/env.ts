type Environment = {
  mode: 'development' | 'production';
};

type EnvConfig = {
  dev: Environment;
  prod: Environment;
};

const env: EnvConfig = {
  dev: {
    mode: 'development',
  },
  prod: {
    mode: 'production',
  },
};

export function getEnvVars() {
  return __DEV__ ? env.dev : env.prod;
}

export type { Environment };
