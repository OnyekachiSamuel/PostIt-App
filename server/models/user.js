import Sequelize from 'sequelize';
import get from '../config/config';

const config = get(process.env.NODE_ENV);
const sequelize = new Sequelize(config.database, {
  dialect: 'postgres'
});

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
  }
});

User.associate = (models) => {
  User.hasMany(models.Group, {
    foreignKey: 'userId',
    as: 'userId'
  });
  User.belongsTo(models.UsersGroup, {
    foreignKey: 'userId',
    as: 'userId'
  });
  User.hasMany(models.Message, {
    foreignKey: 'userId',
    as: 'userId'
  });
};
export default User;

