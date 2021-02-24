const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    // This route will retrieve the specific data for all tasks for the id of the user for use in displaying the tasks parameters to the dashboard
    // console.log('incoming id on params is:', req.params);
    const userId = req.params.id
    const queryText = `
    SELECT "task"."id", "name", "style", "icon", "task"."complete" AS "tcomplete" , "date_created", "primary_id", "amount", "unit", "special", "timer", "timer_time", "stopwatch", "stopwatch_time", "task_specs"."complete" AS "tscomplete" , "long_streak", "current_streak" FROM "task"
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

router.get('/primary/:id', (req, res) => {
    // This route will retrieve the specific data for the primary tasks for the day for the id of the user for use in displaying on the dashboard
    // console.log('incoming id on params is:', req.params);
    const userId = req.params.id
    const queryText = `
    SELECT "primary_task"."id", "date", "complete", "long_streak", "current_streak" FROM "primary_task"
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
    console.log('req.body is,', req.body);
    // This route will be used to create new tasks for a given user. certain fields accept null values.
    const client = await pool.connect();
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
            const insertTaskSpecText = `INSERT INTO "task_specs" ("amount", "unit", "special", "timer", "timer_time", "stopwatch", "stopwatch_time", "task_id")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
            const insertTaskSpecValues = [spec.amount, spec.unit, spec.special, spec.timer, spec.timerTime, spec.stopwatch, spec.stopwatchTime, newTaskId];
            return client.query(insertTaskSpecText, insertTaskSpecValues);
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

router.put('/complete/:id', (req, res) => {
    const taskId = req.params.id
    const queryText = `
    UPDATE "task"
    SET "complete" = true
    WHERE "id" = $1`
    pool.query(queryText, [taskId])
        .then((response) => {
            res.sendStatus(200)
        }).catch((err) => {
            console.log(err);
        })
});

router.put('/undo/:id', (req, res) => {
    console.log('undoing task with id of', req.params.id);
    const taskId = req.params.id
    const queryText = `
    UPDATE "task"
    SET "complete" = false
    WHERE "id" = $1`
    pool.query(queryText, [taskId])
        .then((response) => {
            res.sendStatus(200)
        }).catch((err) => {
            console.log(err);
        })
});

router.put('/edit/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        // req.body will contain information on the task, as well as an array of task_specs. single tasks will only have 1 object in the array,
        // but this code should also be usable for multi-tasks if/when those are implemented
        const {
            name,
            style,
            icon,
            date_created,   //these were needed only for creation and are not used here
            user_id,        //these were needed only for creation and are not used here
            primary_id,     //these were needed only for creation and are not used here
            task_specs
        } = req.body
        const taskId = req.params.id;
        await client.query('BEGIN')
        const taskInsertResults = await client.query(`
        UPDATE "task" 
         SET "name"=$1, "style"=$2, "icon"=$3
        WHERE "id"=$4
        RETURNING id;`, [name, style, icon, taskId]);

        await Promise.all(task_specs.map(spec => {
            const insertTaskSpecText = `
        UPDATE "task_specs" 
        SET "amount"=$1, "unit"=$2, "special"=$3, "timer"=$4, "timer_time"=$5 "stopwatch"=$6
        WHERE "task_id"=$7`;
            const insertTaskSpecValues = [spec.amount, spec.unit, spec.special, spec.timer, spec.timerTime, spec.stopwatch, taskId];
            return client.query(insertTaskSpecText, insertTaskSpecValues);
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

router.put('/toggle', (req, res) => {
    const ptInfo = req.body;
    const queryText = `
    UPDATE "primary_task"
    SET "complete" = $1
    WHERE "id" = $2;`
    pool.query(queryText, [!ptInfo.primeComp, ptInfo.primeTaskId])
    .then ((response) => {
        res.sendStatus(200)
    }).catch ((err) => {
        console.log(err);
    })
});


module.exports = router;
