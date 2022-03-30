'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.dropTable('post_hashtag');
    },

    async down(queryInterface, Sequelize) {},
};
