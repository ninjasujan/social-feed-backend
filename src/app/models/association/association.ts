import { Sequelize } from 'sequelize';

const makeAssociation = async (sequelize: Sequelize) => {
    const { user, post, hashtag, post_hashtag, post_usertag, likes, comment } =
        sequelize.models;

    /** User and post association - One to Many */
    user.hasMany(post, { as: 'userPost', foreignKey: 'userId' });
    post.belongsTo(user, { as: 'creator', foreignKey: 'userId' });

    /** Post and hashtag association -  need to refine */
    post.belongsToMany(hashtag, {
        through: 'post_hashtag',
        foreignKey: 'postId',
        otherKey: 'hashTagId',
        as: 'hashtags',
    });
    hashtag.belongsToMany(post, {
        through: 'post_hashtag',
        foreignKey: 'hashTagId',
        otherKey: 'postId',
        as: 'posts',
    });
    post_hashtag.belongsTo(post, { foreignKey: 'postId', as: 'posts' });
    post_hashtag.belongsTo(hashtag, {
        foreignKey: 'hashTagId',
        as: 'hashtags',
    });

    /** Post user likes association */
    user.belongsToMany(post, {
        through: 'likes',
        foreignKey: 'userId',
        otherKey: 'postId',
        as: 'likedPost',
    });
    post.belongsToMany(user, {
        through: 'likes',
        foreignKey: 'postId',
        otherKey: 'userId',
        as: 'likedUser',
    });
    likes.belongsTo(user, { foreignKey: 'userId', as: 'user' });
    likes.belongsTo(post, { foreignKey: 'postId', as: 'post' });

    /** user, Post and comment Model */
    user.belongsToMany(post, {
        through: 'comment',
        as: 'posts',
        foreignKey: 'userId',
        otherKey: 'postId',
    });
    post.belongsToMany(user, {
        through: 'comment',
        as: 'users',
        foreignKey: 'postId',
        otherKey: 'userId',
    });
    comment.belongsTo(user, { foreignKey: 'userId', as: 'user' });
    comment.belongsTo(post, { foreignKey: 'postId', as: 'post' });
    comment.belongsTo(comment, {
        foreignKey: 'parentComment',
        as: 'parent',
    });

    /** User and Post Tag Association */
    user.belongsToMany(post, {
        through: 'post_usertag',
        as: 'userPostTag',
        foreignKey: 'userId',
        otherKey: 'postId',
    });
    post.belongsToMany(user, {
        through: 'post_usertag',
        as: 'postUserTag',
        foreignKey: 'postId',
        otherKey: 'userId',
    });
    post_usertag.belongsTo(post, {
        foreignKey: 'postId',
        as: 'post_usertag_post',
    });
    post_usertag.belongsTo(user, {
        foreignKey: 'userId',
        as: 'post_usertag_user',
    });
    console.log('[Model Association applied]');
};

export default makeAssociation;
