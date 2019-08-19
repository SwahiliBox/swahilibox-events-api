module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('events', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
    }),

  down: queryInterface => queryInterface.removeColumn('events', 'slug'),
}
