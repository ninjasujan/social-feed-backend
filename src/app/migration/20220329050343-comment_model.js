'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('comment', {
            _id: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
                autoIncrement: true,
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
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'user',
                    key: '_id',
                },
                onDelete: 'CASCADE',
                primaryKey: true,
            },
            parentComment: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'comment',
                    key: '_id',
                },
                onDelete: 'CASCADE',
                defaultValue: null,
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('comment');
    },
};
