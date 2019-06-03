const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING,
          unique: true,
          primaryKey: true,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'first_name',
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'last_name',
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        roleId: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'role_id',
          references: {
            model: 'roles',
            key: 'id',
          },
        },
      },
      {
        tableName: 'users',
        sequelize,
      },
    )
  }

  static associate(models) {
    this.hasOne(models.Role)
  }
}
