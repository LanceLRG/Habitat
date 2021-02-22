const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    // This route will retrieve the specific data for all tasks for the id of the user for use in displaying the tasks parameters to the dashboard
    // console.log('incoming id on params is:', req.params);
    const userId = req.params.id
    const queryText = `
  SELECT "name", "style", "icon", "task"."complete", "date_created", "primary_id", "amount", "unit", "special", "timer", "timer_time", "stopwatch", "stopwatch_time", "task_specs"."complete", "long_streak", "current_streak" FROM "task"
  JOIN "task_specs" ON "task_specs"."task_id" = "task"."id"
  JOIN "user" ON "user"."id" = "task"."user_id"
  WHERE "user_id" = $1;`
    pool.query(queryText, [userId])
        .then((response) => {
            res.send(response.rows)
        }).catch((err) => {
            console.log(err);
        })
});

router.get('/:id', (req, res) => {
    // This route will retrieve the specific data for the primary tasks for the day for the id of the user for use in displaying on the dashboard
    // console.log('incoming id on params is:', req.params);
    const userId = req.params.id
    const queryText = `
    SELECT "date", "complete", "long_streak", "current_streak" FROM "primary_task"
    JOIN "user" ON "user"."id" = "primary_task"."user_id"
    WHERE "user_id" = $1
    ORDER BY "date" DESC;`
    pool.query(queryText, [userId])
        .then((response) => {
            res.send(response.rows)
        }).catch((err) => {
            console.log(err);
        })
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
    // This route will be used to create new tasks for a given user. certain fields accept null values.
    const clietn = await pool.connect();
    try {
        // req.body will contain information on the task, as well as an array of task_specs. single tasks will only have 1 object in the array,
        // but this code should also be usable for multi-tasks if/when those are implemented
        const {
            name,
            style,
            icon,
            date_created,
            user_id,
            primary_id,
            task_specs
        } = req.body
        await client.query('BEGIN')
        const taskInsertResults = await client.query(`
  INSERT INTO "task" ("name", "style", "icon", "date_created", "user_id", "primary_id")
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id;`, [name, style, icon, date_created, user_id, primary_id]);
        const newTaskId = taskInsertResults.rows[0].id;

        await Promise.all(task_specs.map(spec => {
            const insterTaskSpecText = `INSERT INTO "task_specs" ("amount", "unit", "special", "timer", "timer_time", "stopwatch", "stopwatch_time", "task_id")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
            const insertTaskSpecValues = [spec.amount, spec.unit, spec.special, spec.timer, spec.timerTime, spec.stopwatch, spec.stopwatchTime, newTaskId];
            return client.query(insterTaskSpecText, insertTaskSpecValues);
        }));

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/task', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

module.exports = router;
