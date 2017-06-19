import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://ponsukiz:OhlSDPBe6FHbcChTF-HHmaVl68gMj5WP@stampy.db.elephantsql.com:5432/ponsukiz');

const Messages = sequelize.define('Messages', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
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
      model: 'Group',
      key: 'id',
      as: 'groupId'
    }
  }
}, {
  classMethods: {
    associate: (models) => {
      // associations can be defined here
      Messages.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Messages.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
      });
    }
  }
});

export default Messages;

