const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//GET NOTIFICATIONS ON LOAD
router.get('/', (req, res) => {
    console.log('in get notifications for user id:', req.user.id);
    let queryText = `SELECT "name", "clubs_id", "invite_accepted" from "clubs"
                        JOIN "user_clubs" ON "user_clubs"."clubs_id" = "clubs"."id"
                        WHERE "user_id" = $1 AND "invite_accepted" = FALSE;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            console.log('in notifications GET:', result.rows);
            res.send(result.rows)

        }).catch((error) => {
            console.log('in notifications GET error:', error);
            res.sendStatus(500);

        })

})


module.exports = router;