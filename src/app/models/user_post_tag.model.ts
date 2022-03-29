import Sequelize, { DataTypes, Sequelize as ISequelize } from 'sequelize';

export interface IUserTagAttribute {
    _id: number;
    userId: number;
    postId: number;
}

export interface IUserTagCreateAttribute
    extends Sequelize.Optional<IUserTagAttribute, '_id'> {}

export interface IUserTagModel
    extends Sequelize.Model<IUserTagAttribute, IUserTagCreateAttribute>,
        IUserTagAttribute {
    createdAt?: Date;
    updatedAt?: Date;
}

const defineUserTagModel = (sequelize: ISequelize) => {
    return sequelize.define<IUserTagModel>(
        'post_usertag',
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

export default defineUserTagModel;
