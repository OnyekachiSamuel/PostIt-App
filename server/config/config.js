import env from 'dotenv';

env.config();

const config = {
  production: {
    database: process.env.DB_URL_PRODUCTION
  },
  default: {
    database: process.env.DB_URL_DEVELOPMENT
  }
};

// exports.get = function get(env) {
//   return config[env] || config.default;
// };
const get = (nodeEnv) => {
  return config[nodeEnv] || config.default;
};

export default get;
