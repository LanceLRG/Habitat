const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const userID = 1; // TODO: change userID to be equal to Params
  const queryText = `SELECT "id", "date", "complete" FROM "Day";` 
  pool.query(queryText)
  .then ((response) => {
    console.log(response);
    res.send(response.rows)
  }).catch ((err) => {
    console.log(err);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  const date = req.body;
  const queryText = `INSERT INTO "Day" ("date") VALUES ($1);`;
  pool.query(queryText, [date])
  .then ((response) => {
    console.log(response);
  }).catch ((err) => {
    console.log(err);
  })
});

router.put('/', (req, res) => {
  //PUT route code here
  const taskID = 1; // TODO: change userID to be equal to Params
  const queryText = `UPDATE "Day"
  SET "complete" = 'true'
  WHERE id= $1;`;
  pool.query(queryText, [taskID])
  .then ((response) => {
    console.log(response);
  }).catch ((err) => {
    console.log(err);
  })
})

module.exports = router;
