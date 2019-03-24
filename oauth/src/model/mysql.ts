/**
 * Connecting to database and defining models.
 */

import * as Sequelize from 'sequelize';
import './user';

export const sequelize: Sequelize.Sequelize = new Sequelize(
  'antodo16022018', 
  process.env.USER_MYSQL, 
  process.env.PASSWORD_MYSQL, {
    host: process.env.HOST_MYSQL,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8_spanish_ci'
    }, 
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 20000
    },
    define: {
      charset: 'utf8',
    }
});

export const models: any = {
  User: sequelize.import('./user'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});



