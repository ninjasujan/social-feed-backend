import Sequelize, { DataTypes, Sequelize as ISequelize } from 'sequelize';

export interface IHashTagAttribute {
    _id: number;
    postId: number;
    hashTagId: number;
}

export interface IHashTagCreateAttribute
    extends Sequelize.Optional<IHashTagAttribute, '_id'> {}

export interface IHashTagModel
    extends Sequelize.Model<IHashTagAttribute, IHashTagCreateAttribute>,
        IHashTagAttribute {
    createdAt?: Date;
    updatedAt?: Date;
}

const defineHashTagModel = (sequelize: ISequelize) => {
    return sequelize.define<IHashTagModel>(
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
            },
            hashTagId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'post',
                    key: '_id',
                },
                onDelete: 'CASCADE',
            },
        },
        { timestamps: true, freezeTableName: true },
    );
};

export default defineHashTagModel;
