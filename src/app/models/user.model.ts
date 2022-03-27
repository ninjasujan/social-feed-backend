import Sequelize, { DataTypes, Sequelize as ISequelize } from 'sequelize';

export interface IUserAttribute {
  _id?: number;
  userName: string;
  password: string;
  salt: string;
}

export interface IUserCreateAttribute
  extends Sequelize.Optional<IUserAttribute, '_id'> {}

export interface IUserModel
  extends Sequelize.Model<IUserAttribute, IUserCreateAttribute>,
    IUserAttribute {
  createdAt?: Date;
  updatedAt?: Date;
}

const defineUserModel = (sequelize: ISequelize) => {
  const userModel = sequelize.define<IUserModel>(
    'user',
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, freezeTableName: true },
  );
  return userModel;
};

export default defineUserModel;
