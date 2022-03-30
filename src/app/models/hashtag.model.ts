import Sequelize, { DataTypes, Sequelize as ISequelize } from 'sequelize';

export interface IHashTagAttribute {
    _id: number;
    userId: number;
    caption: string;
    location: string;
    resourceUrl: Array<string>;
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
        'hashtag',
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
            resourceUrl: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
        },
        { timestamps: true, freezeTableName: true },
    );
};

export default defineHashTagModel;
