const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post', {
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
        default: null,
      },
      resourceUrl: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('post');
  },
};
