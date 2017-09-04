import Sequelize from 'sequelize';
import get from '../config/config';

const config = get(process.env.NODE_ENV);

const sequelize = new Sequelize(config.database, {
  dialect: 'postgres'
});
const Message = sequelize.define('Message', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  priority: {
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
});

Message.associate = (models) => {
  Message.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  Message.belongsTo(models.Group, {
    foreignKey: 'groupId',
    onDelete: 'CASCADE',
  });
};

export default Message;
