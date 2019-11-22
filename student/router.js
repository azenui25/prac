 
const Sequelize = require('sequelize');
const db = require('../db');
const Batch = require('../batch/model') 
const Score = require('../score/model')



const Student = db.define("student", {
  date: {
    type: Sequelize.STRING
  },
  name: Sequelize.STRING,
  nationality: Sequelize.STRING,
  photo: Sequelize.STRING,
  Score: Sequelize.STRING

});





Student.belongsTo(Batch)
Student.belongsTo(Score)
Batch.hasMany(Student) 





module.exports = Student