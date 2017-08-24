import env from 'dotenv';

env.config();

const config = {
  production: {
    database: process.env.DB_URL_PRODUCTION,
    dialect: 'postgres'
  },
  default: {
    database: process.env.DB_URL_DEVELOPMENT,
    dialect: 'postgres'
  }
};
const get = (nodeEnv) => {
  return config[nodeEnv] || config.default;
};

export default get;
