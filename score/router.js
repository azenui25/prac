const { Router } = require('express')
const Score = require('./model')
const Student = require('../student/model')
const User = require('../user/model')
const auth = require('../auth /middleware')

const router = new Router();

router.get('/scores', (req, res, next) => {
  Score.findAll()
    .then(scores => {
      res.send(scores);
    })
    .catch(next);
});

router.get('/scores/:id', (req, res, next) => {
  Score.findByPk(req.params.id, { include: [ Student ] })
    .then(score => {
      res.send(score);
    })
    .catch(next);
});

// // Create a new player account
router.post("/scores", (req, res, next) => {
  // console.log("WHAT IS REQ.BODY", req.body)
  Score.create(req.body)
    .then(score => res.json(score))
    .catch(next)
});

router.delete("/scores/:ScoreId", (req, res, next) => {
  // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)
  // res.send('Some people want to watch the world burn') // -> route works

  Score.destroy({
    where: {
      id: req.params.ScoreId,
    }
  })
  .then(numDeleted => {
    if (numDeleted) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
  .catch(next);
});

router.put("/scores/:ScoreId", (req, res, next) => {
  // res.send('oh hi')
  // console.log(req.params, 'WRECKED BY PARAMS??')
  Score.findByPk(req.params.scoreId)
    .then(Score => {
      // console.log("Score FOUND?", Score)
      if (Score) {
        Score
          .update(req.body)
          .then(score => res.json(score));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});


  module.exports = router;
  