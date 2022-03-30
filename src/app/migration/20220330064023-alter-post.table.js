'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('post', 'type');
    },

    async down(queryInterface, Sequelize) {},
};
