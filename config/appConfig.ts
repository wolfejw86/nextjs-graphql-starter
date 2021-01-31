function loadServerEnvVar(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is required on server`);
  }

  return value;
}

export const appConfig = {
  myServerVariable: loadServerEnvVar('NODE_ENV'),
};

export type AppConfig = typeof appConfig;
