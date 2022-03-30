import { Sequelize } from 'sequelize';
import defineUserModel from '@feed-models/user.model';
import definePostModel from '@feed-models/post.model';
import Model from '@feed-models/model';
import makeAssociation from '@feed-models/association/association';
import defineHashTagModel from '@feed-models/hashtag.model';
import defineUserTagModel from '@feed-models/user_post_tag.model';
import definePostHashTagModel from '@feed-models/post_hashtag.model';

export const defineModels = (sequelize: Sequelize) => {
    /** Define databse model using sequelize connection onject */
    defineUserModel(sequelize);
    definePostModel(sequelize);
    defineHashTagModel(sequelize);
    defineUserTagModel(sequelize);
    definePostHashTagModel(sequelize);

    /** Make association */
    makeAssociation(sequelize);

    /** Load databse models from sequelize */
    Model.init(sequelize);
};

export default defineModels;
