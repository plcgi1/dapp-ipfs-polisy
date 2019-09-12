module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      nonce: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: () => Math.floor(Math.random() * 1000000) // Initialize with a random nonce
      },
      publicAddress: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: { isLowercase: true }
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      }
    }).then(() => {
      return queryInterface.addIndex('Users', ['publicAddress'], { indicesType: 'UNIQUE' })
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Users')
  }
}
