module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('roles', {
      id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('roles'),
}
