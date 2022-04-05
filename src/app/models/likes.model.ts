import Sequelize, { DataTypes, Sequelize as ISequelize } from 'sequelize';

export interface ILikeAttributes {
    _id: number;
    userId: number;
    postId: number;
}

export interface ILikeCreateAttribute
    extends Sequelize.Optional<ILikeAttributes, '_id'> {}

export interface ILikeModel
    extends Sequelize.Model<ILikeAttributes, ILikeCreateAttribute>,
        ILikeAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const defineLikesModel = (sequelize: ISequelize) => {
    return sequelize.define<ILikeModel>(
        'likes',
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
                onDelete: 'CASCADE',
            },
            postId: {
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

export default defineLikesModel;
