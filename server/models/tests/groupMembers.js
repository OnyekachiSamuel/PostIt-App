import Sequelize from 'sequelize';
import config from '../../config/test_db_url.json';

const sequelize = new Sequelize(config.url);
const Groups = sequelize.define('GroupMembers', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
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
      // associations is defined here
      Groups.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Groups.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
      });
    }
  }
});

export default Groups;
