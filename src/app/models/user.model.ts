import Sequelize from 'sequelize';
import Database from '../../providers/Database';

const userModel = Database.sequelize.define(
  'user',
  {
    _id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true },
);

export default userModel;
