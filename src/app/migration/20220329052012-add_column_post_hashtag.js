'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('post_hashtag', '_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('post_hashtag', '_id');
    },
};
