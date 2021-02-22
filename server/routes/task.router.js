const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // GET route code here
  console.log('incoming id on params is:', req.params);
  const userId = req.params.id
  const queryText = `
  SELECT "name", "style", "icon", "task"."complete", "date_created", "primary_id", "amount", "unit", "special", "timer", "timer_time", "stopwatch", "stopwatch_time", "task_specs"."complete", "long_streak", "current_streak" FROM "task"
  JOIN "task_specs" ON "task_specs"."task_id" = "task"."id"
  JOIN "user" ON "user"."id" = "task"."user_id"
  WHERE "user_id" = $1;`
  pool.query(queryText, [userId])
  .then ((response) => {
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
});

module.exports = router;
