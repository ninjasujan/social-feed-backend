import { Sequelize } from 'sequelize/types';
import defineUserModel from './user.model';
import Model from './model';

export const defineModels = (sequelize: Sequelize) => {
  /** Define databse model using sequelize connection onject */
  defineUserModel(sequelize);
  /** Load databse models from sequelize */
  Model.init(sequelize);
};

export default defineModels;
