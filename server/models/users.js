import Sequelize from 'sequelize';
import config from '../config/db_url.json';

const sequelize = new Sequelize(config.url);

const Users = sequelize.define('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9\\-]+$/i,
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  classMethods: {
    associate: (models) => {
      // associations can be defined here
      Users.hasMany(models.Groups, {
        foreignKey: 'userId',
        as: 'userId'
      });
      Users.hasMany(models.GroupMembers, {
        foreignKey: 'userId',
        as: 'userId'
      });
      Users.hasMany(models.Messages, {
        foreignKey: 'userId',
        as: 'userId'
      });
    }
  }
});

export default Users;
