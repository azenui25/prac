const Sequelize = require('sequelize')
const db = require('../db')
const Student = require('../student/model')
const User = require('../user/model')
// const Batch = require ('../batch/model')


// const Score = db.define('score', {
//     // date:{type: Sequelize.STRING},
//     // green: { type: Sequelize.STRING},
//     // yellow: { type: Sequelize.STRING},
//     // red: { type: Sequelize.STRING},
//     // remark: { type: Sequelize.STRING}

//     date: {type:Sequelize.STRING, default:Date.now },
//     score:{type:Sequelize.STRING, default: 'red'},
//     remark: Sequelize.STRING
    

// })
const Score = db.define("score", {
    date: {
      type: Sequelize.STRING
    },
    grade: {
      type: Sequelize.STRING,
    },
    remark: {
      type: Sequelize.STRING
    }
  })

  Score.hasMany(User)
  





module.exports = Score