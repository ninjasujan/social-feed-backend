import { Sequelize } from 'sequelize';

const makeAssociation = async (sequelize: Sequelize) => {
    const { user, post, hashtag, post_hashtag, post_usertag, likes, comment } =
        sequelize.models;
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

    /** Post user likes association */
    user.belongsToMany(post, { through: 'likes', foreignKey: 'userId' });
    post.belongsToMany(user, { through: 'likes', foreignKey: 'postId' });
    likes.belongsTo(user, { foreignKey: 'userId' });
    likes.belongsTo(post, { foreignKey: 'postId' });

    /** Post and comment Model */
    user.belongsToMany(post, { through: 'comment', foreignKey: 'postId' });
    post.belongsToMany(user, { through: 'comment', foreignKey: 'userId' });
    comment.belongsTo(user, { foreignKey: 'userId' });
    comment.belongsTo(post, { foreignKey: 'postId' });

    comment.belongsTo(comment, { foreignKey: 'parentComment' });

    /** User and Post Tag Association */
    user.belongsToMany(post, { through: 'post_usertag', foreignKey: 'postId' });
    post.belongsToMany(user, { through: 'post_usertag', foreignKey: 'userId' });
    post_usertag.belongsTo(post, { foreignKey: 'postId' });
    post_usertag.belongsTo(user, { foreignKey: 'userId' });

    console.log('[Model Association applied]');
};

export default makeAssociation;
