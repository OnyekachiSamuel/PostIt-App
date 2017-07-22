import Sequelize from 'sequelize';
import config from '../config/db.json';

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
      model: 'users',
      key: 'id',
      as: 'userId'
    }
  },
  groupId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'groups',
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
