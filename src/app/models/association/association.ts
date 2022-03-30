import { Sequelize } from 'sequelize';

const makeAssociation = async (sequelize: Sequelize) => {
    const { user, post, hashtag, post_hashtag } = sequelize.models;
    /** User and post association - One to Many */
    user.hasMany(post);
    post.belongsTo(user);

    /** Post and hashtag association -  One to Many */
    post.belongsToMany(hashtag, {
        through: 'post_hashtag',
        foreignKey: 'postId',
    });
    hashtag.belongsToMany(post, {
        through: 'post_hashtag',
        foreignKey: 'hashTagId',
    });

    post_hashtag.belongsTo(post, { foreignKey: 'postId' });
    post_hashtag.belongsTo(hashtag, { foreignKey: 'hashTagId' });

    /** User and Post Tag Association */
    user.belongsToMany(post, { through: 'post_usertag' });
    post.belongsToMany(user, { through: 'post_usertag' });

    console.log('[Model Association applied]');
};

export default makeAssociation;
