const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey:true,
        unique: true, 
      },
      core1: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      core2: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      core3: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      core4: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      core5: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      } 
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'cpudb',
      tableName: 'cpu',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};
