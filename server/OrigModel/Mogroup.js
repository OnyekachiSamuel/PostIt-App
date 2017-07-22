import Sequelize from 'sequelize';
import config from '../config/db.json';

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
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: true,
    onDelete: 'CASCADE',
    references: {
      model: 'User',
      key: 'id',
      as: 'userId'
    }
  }
}, {
  classMethods: {
    associate: (models) => {
      // associations can be defined here
      Group.hasMany(models.UsersGroup, {
        foreignKey: 'groupId',
        as: 'groupId'
      });
      Group.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
});

export default Group;
