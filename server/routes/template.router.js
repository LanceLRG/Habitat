const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const userID = 1; // TODO: change userID to be equal to Params
  const queryText = `SELECT "id", "date", "complete" FROM "Day" ORDER BY id DESC;` 
  pool.query(queryText)
  .then ((response) => {
    console.log('got some days');
    res.send(response.rows)
  }).catch ((err) => {
    console.log(err);
  })
});

/**
 * GET route template
 */
router.get('/check', (req, res) => {
  // GET route code here
  const userID = 1; // TODO: change userID to be equal to Params
  const queryText = `SELECT "id", "date", "date_day", "complete" FROM "Day" WHERE "date_day" IS NOT NULL ORDER BY "date" DESC LIMIT 2;` 
  pool.query(queryText)
  .then ((response) => {
    console.log(response);
    res.send(response.rows)
  }).catch ((err) => {
    console.log(err);
  })
});

router.get('/getdays', (req, res) => {
  // GET route code here
  const userID = 1; // TODO: change userID to be equal to Params
  const queryText = `SELECT "id", "date", "date_day", "complete" FROM "Day" WHERE "date_day" IS NOT NULL ORDER BY "date" ASC ;` 
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
  console.log('date is', date);
  const queryText = `INSERT INTO "Day" ("date") VALUES ($1);`;
  pool.query(queryText, [date.date])
  .then ((response) => {
    console.log(response);
  }).catch ((err) => {
    console.log(err);
  })
});

router.post('/newday', (req, res) => {
  // POST new day
  const date = req.body.newday;
  console.log('date is', date);
  const queryText = `INSERT INTO "Day" ("date_day", "date" ) VALUES ($1, $2);`;
  pool.query(queryText, [date, date])
  .then ((response) => {
    console.log(response);
  }).catch ((err) => {
    console.log(err);
  })
});

router.put('/', (req, res) => {
  //PUT route code here
  const taskID = req.body.id; // TODO: change userID to be equal to Params
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
