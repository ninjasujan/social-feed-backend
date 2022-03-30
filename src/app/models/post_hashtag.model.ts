import Sequelize, { DataTypes, Sequelize as ISequelize } from 'sequelize';

export interface IPostHashTagAttribute {
    _id: number;
    postId: number;
    hashTagId: number;
}

export interface IPostHashTagCreateAttribute
    extends Sequelize.Optional<IPostHashTagAttribute, '_id'> {}

export interface IPostHashTagModel
    extends Sequelize.Model<IPostHashTagAttribute, IPostHashTagCreateAttribute>,
        IPostHashTagAttribute {
    createdAt?: Date;
    updatedAt?: Date;
}

const definePostHashTagModel = (sequelize: ISequelize) => {
    return sequelize.define<IPostHashTagModel>(
        'post_hashtag',
        {
            _id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            postId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'post',
                    key: '_id',
                },
                onDelete: 'CASCADE',
                primaryKey: true,
            },
            hashTagId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'hashtag',
                    key: '_id',
                },
                onDelete: 'CASCADE',
                primaryKey: true,
            },
        },
        { timestamps: true, freezeTableName: true },
    );
};

export default definePostHashTagModel;
