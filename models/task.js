'use strict';
module.exports = (sequelize, DataTypes) => {
  var task = sequelize.define('task', {
    title: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return task;
};