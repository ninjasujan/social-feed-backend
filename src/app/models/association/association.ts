import { Sequelize } from 'sequelize';

const makeAssociation = async (sequelize: Sequelize) => {
  const { user, post } = sequelize.models;
  /** User and post association */
  user.hasMany(post);
  post.belongsTo(user);
};

export default makeAssociation;
