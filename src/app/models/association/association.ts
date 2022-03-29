import { Sequelize } from 'sequelize';
import { IUserTagModel } from '@feed-models/user_post_tag.model';

const makeAssociation = async (sequelize: Sequelize) => {
    const { user, post, post_hashtag } = sequelize.models;
    /** User and post association - One to Many */
    user.hasMany(post);
    post.belongsTo(user);

    /** Post and hashtag association -  One to Many */
    post.hasMany(post_hashtag);
    post_hashtag.belongsTo(post);

    /** User and Post Tag Association */
    user.belongsToMany(post, { through: 'post_usertag' });
    post.belongsToMany(user, { through: 'post_usertag' });

    console.log('[Model Association applied]');
};

export default makeAssociation;
