/**
 * Setup User model.
 */

import * as Sequelize from 'sequelize';
import { sequelize } from './mysql';
import * as bcrypt from 'bcryptjs';

export default (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(40), 
      unique: true,
      allowNull: false, 
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: Sequelize.STRING(15),
      validate: {
        not: ["[a-z]",'i']
      }
    },
    phone2: {
      type: Sequelize.STRING(15),
      validate: {
        not: ["[a-z]",'i']
      }
    },
    address: {
      type: Sequelize.STRING(100)
    },
    zipcode: {
      type: Sequelize.STRING(5),
      validate: {
        not: ["[a-z]",'i']
      }
    },
    city: {
      type: Sequelize.STRING(20)
    },
    country: {
      type: Sequelize.STRING(20)
    },
    password: {
      type: Sequelize.STRING(60), 
      allowNull: false
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false 
    } 
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ],
    paranoid: true,
    hooks: {
      beforeCreate: function(user) {
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  return User;
}