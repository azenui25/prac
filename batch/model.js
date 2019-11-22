const Sequelize = require('sequelize')
const db = require('../db')

const Batch = db.define("batch", {
    name:{
        type: Sequelize.STRING,
        field: 'batch_name'
    },
    startDate: {
        type: Sequelize.STRING,
        field: 'start_date'
    },
    endDate: {
        type: Sequelize.STRING,
        field: 'end_date'
    },
    numberOfStudents:{
        type: Sequelize.INTEGER,
        field: 'number_of_students'
    },
  
})



module.exports = Batch;