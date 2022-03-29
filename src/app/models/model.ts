import Sequelize, { Sequelize as ISequelize } from 'sequelize';
import { IPostCreateAttribute, IPostModel } from '@feed-models/post.model';
import { IUserModel, IUserCreateAttribute } from '@feed-models/user.model';
import { IHashTagCreateAttribute, IHashTagModel } from './post_hashtag.model';
import { IUserTagCreateAttribute, IUserTagModel } from './user_post_tag.model';

class Model {
    public static User: Sequelize.ModelStatic<
        Sequelize.Model<IUserModel, IUserCreateAttribute>
    >;
    public static Post: Sequelize.ModelStatic<
        Sequelize.Model<IPostModel, IPostCreateAttribute>
    >;
    public static UserPostTag: Sequelize.ModelStatic<
        Sequelize.Model<IUserTagModel, IUserTagCreateAttribute>
    >;
    public static PostHashTag: Sequelize.ModelStatic<
        Sequelize.Model<IHashTagModel, IHashTagCreateAttribute>
    >;
    public static init(sequelize: ISequelize) {
        Model.User = sequelize.models.user;
        Model.Post = sequelize.models.post;
        Model.UserPostTag = sequelize.models.post_usertag;
        Model.PostHashTag = sequelize.models.post_hashtag;
    }
}

export default Model;
