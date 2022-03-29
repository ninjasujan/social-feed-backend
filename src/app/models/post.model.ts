import Sequelize, { DataTypes, Sequelize as ISequelize } from 'sequelize';
import { postType, PostType } from '@feed-constants/feed.constant';

export interface IPostAttribute {
    _id: number;
    userId: number;
    type: PostType;
    caption: string;
    location: string;
    resourceUrl: Array<string>;
}

export interface IPostCreateAttribute
    extends Sequelize.Optional<IPostAttribute, '_id'> {}

export interface IPostModel
    extends Sequelize.Model<IPostAttribute, IPostCreateAttribute>,
        IPostAttribute {
    createdAt?: Date;
    updatedAt?: Date;
}

const definePostModel = (sequelize: ISequelize) => {
    return sequelize.define<IPostModel>(
        'post',
        {
            _id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'user',
                    key: '_id',
                },
                onDelete: 'RESTRICT',
            },
            caption: {
                type: DataTypes.STRING(500),
                defaultValue: null,
            },
            location: {
                type: DataTypes.STRING,
                defaultValue: null,
            },
            type: {
                type: DataTypes.ENUM(...Object.values(postType)),
                defaultValue: postType.POST,
            },
            resourceUrl: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
        },
        { timestamps: true, freezeTableName: true },
    );
};

export default definePostModel;
