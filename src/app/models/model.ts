import Sequelize, { Sequelize as ISequelize } from 'sequelize';
import { IPostCreateAttribute, IPostModel } from '@feed-models/post.model';
import { IUserModel, IUserCreateAttribute } from '@feed-models/user.model';
import {
    IHashTagCreateAttribute,
    IHashTagModel,
} from '@feed-models/hashtag.model';
import {
    IUserTagCreateAttribute,
    IUserTagModel,
} from '@feed-models/user_post_tag.model';
import {
    IPostHashTagCreateAttribute,
    IPostHashTagModel,
} from '@feed-models/post_hashtag.model';
import {
    ILikeAttributes,
    ILikeCreateAttribute,
} from '@feed-models/likes.model';
import { ICommentCreateAttribute, ICommentModel } from './comment.model';

class Model {
    public static User: Sequelize.ModelStatic<
        Sequelize.Model<IUserModel, IUserCreateAttribute>
    >;
    public static Post: Sequelize.ModelStatic<
        Sequelize.Model<IPostModel, IPostCreateAttribute>
    >;
    public static HashTag: Sequelize.ModelStatic<
        Sequelize.Model<IHashTagModel, IHashTagCreateAttribute>
    >;
    public static UserPostTag: Sequelize.ModelStatic<
        Sequelize.Model<IUserTagModel, IUserTagCreateAttribute>
    >;
    public static PostHashTag: Sequelize.ModelStatic<
        Sequelize.Model<IPostHashTagModel, IPostHashTagCreateAttribute>
    >;
    public static Likes: Sequelize.ModelStatic<
        Sequelize.Model<ILikeAttributes, ILikeCreateAttribute>
    >;
    public static Comment: Sequelize.ModelStatic<
        Sequelize.Model<ICommentModel, ICommentCreateAttribute>
    >;
    public static init(sequelize: ISequelize) {
        Model.User = sequelize.models.user;
        Model.Post = sequelize.models.post;
        Model.HashTag = sequelize.models.hashtag;
        Model.UserPostTag = sequelize.models.post_usertag;
        Model.PostHashTag = sequelize.models.post_hashtag;
        Model.Likes = sequelize.models.likes;
        Model.Comment = sequelize.models.comment;
    }
}

export default Model;
