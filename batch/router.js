const { Router } = require("express");
const Batch = require("./model");
const Student = require("../student/model");
const authMiddleWare = require("../auth /middleware");



const router = new Router();

router.get("/batches", (req, res, next) => {
    Batch.findAll()
    .then(batches => {
        res.send(batches)
    })
    .catch(next)
})

router.get("/batches/:batchId", (req, res, next) => {
    Batch.findByPk(req.params.batchId, { include: [Student] })
      .then(batch => {
        res.send(batch);
      })
      .catch(next);
  });


// Create a new batch account
router.post("/batches" , (req, res, next) => {
    console.log("Do we have the user of this request?", req.user);
    
  
    // const userId = req.body.userId // NO!
    Batch.create(req.body)
      .then(batch => res.json(batch))
      .catch(next);
  });
  
  router.delete("/batches/:batchId", (req, res, next) => {
    // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)

  
    Batch.destroy({
      where: {
        id: req.params.batchId
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
  
  router.put("/batches/:batchId", (req, res, next) => {
    // res.send('oh hi')
    // console.log(req.params, 'WRECKED BY PARAMS??')
    Batch.findByPk(req.params.batchId)
      .then(batch => {
        console.log("Batch FOUND?", batch);
        if (batch) {
          batch.update(req.body).then(batch => res.json(batch));
        } else {
          res.status(404).end();
        }
      })
      .catch(next);
  });
  
  module.exports = router;