'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('comment', 'comment_pkey');
    },

    async down(queryInterface, Sequelize) {},
};
