module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('rsvps', {
      id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      eventId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'event_id',
        references: {
          model: 'events',
          key: 'id',
        },
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

  down: queryInterface => queryInterface.dropTable('rsvps'),
}
