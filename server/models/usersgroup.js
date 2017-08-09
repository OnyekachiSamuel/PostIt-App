import Sequelize from 'sequelize';
import config from '../config/db_url.json';

const sequelize = new Sequelize(config.url);
const UsersGroup = sequelize.define('UsersGroup', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Users',
      key: 'id',
      as: 'userId'
    }
  },
  groupId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Groups',
      key: 'id',
      as: 'groupId'
    }
  }
}, {
  classMethods: {
    associate: (models) => {
      // associations can be defined here
      UsersGroup.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      UsersGroup.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE'
      });
    }
  }
});
export default UsersGroup;
