'use strict';

//npx sequelize-cli db:migrate
//npx sequelize-cli db:migrate:undo

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addConstraint('users', {
    //   fields: ['email'],
    //   type: 'unique',
    //   name: 'users_email_unique_constraint',
    // });
  },
  
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint('users', 'users_email_unique_constraint');
  },
};
