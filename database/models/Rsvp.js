const Sequelize = require('sequelize')

module.exports = class Rsvp extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
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
            // model in the references should be the tableName
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
      },
      {
        tableName: 'rsvps',
        sequelize,
      },
    )
  }
}
