import Sequelize from 'sequelize';
import config from '../../config/test_db_url.json';

const sequelize = new Sequelize(config.url);
const Group = sequelize.define('Groups', {
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
  users: {
    type: Sequelize.INTEGER,
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
      Group.hasMany(models.GroupMembers, {
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

