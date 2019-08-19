module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('events', 'name', 'title')
    await queryInterface.changeColumn('events', 'title', {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    })
  },

  down: queryInterface =>
    queryInterface.renameColumn('events', 'title', 'name'),
}
