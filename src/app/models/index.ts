import { Sequelize } from 'sequelize';
import defineUserModel from '@feed-models/user.model';
import definePostModel from '@feed-models/post.model';
import Model from '@feed-models/model';
import makeAssociation from '@feed-models/association/association';
import defineHashTagModel from './post_hashtag.model';
import defineUserTagModel from './user_post_tag.model';

export const defineModels = (sequelize: Sequelize) => {
    /** Define databse model using sequelize connection onject */
    defineUserModel(sequelize);
    definePostModel(sequelize);
    defineHashTagModel(sequelize);
    defineUserTagModel(sequelize);

    /** Make association */
    makeAssociation(sequelize);

    /** Load databse models from sequelize */
    Model.init(sequelize);
};

export default defineModels;
