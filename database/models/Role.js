const Sequelize = require('sequelize')

module.exports = class Role extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING,
          unique: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          unique: true,
        },
        // later on define  permissions associated with a role?
        // so a role can have several permissions
        // this can as well be enforced in application authorization logic
      },
      {
        tableName: 'roles',
        sequelize,
      },
    )
  }

  static associate(models) {
    this.hasMany(models.User, {
      as: 'role',
      foreignKey: 'roleId',
    })
  }
}
