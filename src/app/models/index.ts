import { Sequelize } from 'sequelize';
import defineUserModel from './user.model';
import definePostModel from './post.model';
import Model from './model';
import makeAssociation from './association/association';

export const defineModels = (sequelize: Sequelize) => {
  /** Define databse model using sequelize connection onject */
  defineUserModel(sequelize);
  definePostModel(sequelize);

  /** Make association */
  makeAssociation(sequelize);

  /** Load databse models from sequelize */
  Model.init(sequelize);
};

export default defineModels;
