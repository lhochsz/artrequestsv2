'use strict';

/**
	* User Model
	*/

var crypto = require('crypto');

   // load up the user model
var Sequelize = require('sequelize');
require('sequelize-isunique-validator')(Sequelize);

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User', 
		{
			name: DataTypes.STRING,
			email: { 
				type: DataTypes.STRING, 
				allowNull: false,
        		isUnique: true,
        		validate: {
            		isEmail: true,
            		isUnique: sequelize.validateIsUnique('email')
            	}
			},
			username: DataTypes.STRING,
			hashedPassword: DataTypes.STRING,
			provider: DataTypes.STRING,
			salt: DataTypes.STRING
		},
		{
			instanceMethods: {
				toJSON: function () {
					var values = this.get();
					delete values.hashedPassword;
					delete values.salt;
					return values;
				},
				makeSalt: function() {
					return crypto.randomBytes(16).toString('base64'); 
				},
				authenticate: function(plainText){
					return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
				},
				encryptPassword: function(password, salt) {
					if (!password || !salt) {
                        return '';
                    }
					salt = new Buffer(salt, 'base64');
					return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
				}
			},
			associate: function(models) {
				User.hasMany(models.Article);
			}
		}
	);

	return User;
};
