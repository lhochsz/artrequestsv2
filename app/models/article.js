'use strict';

module.exports = function(sequelize, DataTypes) {

	var Article = sequelize.define('Article', {
			title: DataTypes.STRING,
			content: DataTypes.TEXT,
			status: DataTypes.STRING
		},
		{
			associate: function(models){
				Article.belongsTo(models.User);
			}
		}
	);

	return Article;
};
