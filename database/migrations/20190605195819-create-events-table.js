module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('events', {
      id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      time: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
        defaultValue: '14:00:00',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'image_url',
      },
      rsvpEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'rsvp_end_date',
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'created_by',
        references: {
          model: 'users',
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

  down: queryInterface => queryInterface.dropTable('events'),
}
