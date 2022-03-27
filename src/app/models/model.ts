import Sequelize, { Sequelize as ISequelize } from 'sequelize';
import { IPostCreateAttribute, IPostModel } from './post.model';
import { IUserModel, IUserCreateAttribute } from './user.model';

class Model {
  public static User: Sequelize.ModelStatic<
    Sequelize.Model<IUserModel, IUserCreateAttribute>
  >;
  public static Post: Sequelize.ModelStatic<
    Sequelize.Model<IPostModel, IPostCreateAttribute>
  >;
  public static init(sequelize: ISequelize) {
    Model.User = sequelize.models.user;
    Model.Post = sequelize.models.post;
  }
}

export default Model;
