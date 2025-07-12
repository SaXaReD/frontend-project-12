import Rollbar from 'rollbar';
import process from 'process';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  environment: 'development',
};

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;