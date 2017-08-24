import env from 'dotenv';

env.config();

const config = {
  production: {
    database: process.env.DB_URL_PRODUCTION,
  },
  default: {
    database: process.env.DB_URL_DEVELOPMENT,
  }
};
const get = (nodeEnv) => {
  return config[nodeEnv] || config.default;
};

export default get;
