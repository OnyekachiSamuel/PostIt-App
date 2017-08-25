import Sequelize from 'sequelize';
import get from '../config/config';

const config = get(process.env.NODE_ENV);

const sequelize = new Sequelize(config.database, {
  dialect: 'postgres'
});

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
});

Group.associate = (models) => {
  Group.hasMany(models.UsersGroup, {
    foreignKey: 'groupId',
    as: 'groupId'
  });
  Group.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
};
export default Group;

