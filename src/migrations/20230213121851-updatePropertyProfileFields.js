'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PropertyProfiles', 'kitchen', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('PropertyProfiles', 'energy_provider', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('PropertyProfiles', 'telecom_provider', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PropertyProfiles', 'kitchen', {
      type: Sequelize.ENUM("fitted", "separate"),
      allowNull: true
    });
    await queryInterface.changeColumn('PropertyProfiles', 'energy_provider', {
      type: Sequelize.ENUM("british_gas", "edf", "npower", "eon"),
      allowNull: true
    });
    await queryInterface.changeColumn('PropertyProfiles', 'telecom_provider', {
      type: Sequelize.ENUM("virgin", "bt", "ee", "sky"),
      allowNull: true
    });
  }
};
