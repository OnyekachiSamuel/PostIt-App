import Sequelize from 'sequelize';
import config from '../configuration/db.json';

const sequelize = new Sequelize(config.url);

/* module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
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
  return Group;
};*/

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

