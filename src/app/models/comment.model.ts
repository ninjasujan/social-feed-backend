import Sequelize, { DataTypes, Sequelize as ISequelize } from 'sequelize';

export interface ICommentAttribute {
    _id: number;
    userId: number;
    postId: number;
    parentComment: number;
    text: string;
}

export interface ICommentCreateAttribute
    extends Sequelize.Optional<ICommentAttribute, '_id'> {}

export interface ICommentModel
    extends Sequelize.Model<ICommentAttribute, ICommentCreateAttribute>,
        ICommentAttribute {
    createdAt?: Date;
    updatedAt?: Date;
}

const defineCommentModel = (sequelize: ISequelize) => {
    return sequelize.define<ICommentModel>(
        'comment',
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
            parentComment: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'comment',
                    key: '_id',
                },
                onDelete: 'CASCADE',
            },
            text: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        { timestamps: true, freezeTableName: true },
    );
};

export default defineCommentModel;
