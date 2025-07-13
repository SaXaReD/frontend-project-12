const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE === 'development' ? 'development' : 'production',
};

export default rollbarConfig;
