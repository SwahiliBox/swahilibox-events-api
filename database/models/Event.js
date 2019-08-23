const Sequelize = require('sequelize')

module.exports = class Event extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING,
          unique: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          unique: false,
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
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
            // model in the references should be the tableName
            model: 'users',
            key: 'id',
          },
        },
      },
      {
        tableName: 'events',
        sequelize,
      },
    )
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      as: 'guests',
      through: 'rsvp',
      foreignKey: 'eventId',
    })
  }
}
