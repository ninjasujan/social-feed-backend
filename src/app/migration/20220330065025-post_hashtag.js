'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('post_hashtag', {
            _id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
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
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('post_hashtag');
    },
};
