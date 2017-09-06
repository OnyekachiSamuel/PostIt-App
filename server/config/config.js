import env from 'dotenv';

env.config();

const config = {
  production: {
    database: process.env.DB_URL_PRODUCTION,
  },
<<<<<<< HEAD
  test: {
    database: process.env.DB_URL_TEST
  },
=======
>>>>>>> 4c5bc79427575618c3c3b43aa137654779e15019
  default: {
    database: process.env.DB_URL_DEVELOPMENT,
  }
};
const get = (nodeEnv) => {
  return config[nodeEnv] || config.default;
};

export default get;
