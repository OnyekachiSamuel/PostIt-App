import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.url);
const Group = sequelize.define('Group', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  groupCategory: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Users',
      key: 'id',
      as: 'userId'
    }
  }
}, {
  classMethods: {
    associate: (models) => {
      // associations can be defined here
      Group.belongsTo(models.Groups, {
        foreignKey: 'groupId',
        as: 'groupId'
      });
      Group.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
});

export default Group;

