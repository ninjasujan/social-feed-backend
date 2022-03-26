import Sequelize, { Sequelize as ISequelize } from 'sequelize';
import { IUserModel, IUserCreateAttribute } from './user.model';

class Model {
  public static userModel: Sequelize.ModelStatic<
    Sequelize.Model<IUserModel, IUserCreateAttribute>
  >;
  public static init(sequelize: ISequelize) {
    Model.userModel = sequelize.models.user;
  }
}

export default Model;
