'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            _id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userName: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            profileImage: {
                type: DataTypes.STRING,
                defaultValue: null,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    },
};
