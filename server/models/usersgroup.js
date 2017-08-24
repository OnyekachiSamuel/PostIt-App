import Sequelize from 'sequelize';
import get from '../config/config';

const config = get(process.env.NODE_ENV);

const sequelize = new Sequelize(config.database);

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
});

UsersGroup.associate = (models) => {
  UsersGroup.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  UsersGroup.belongsTo(models.Group, {
    foreignKey: 'groupId',
    onDelete: 'CASCADE',
  });
};
export default UsersGroup;
