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


//UPDATE INVITES TO ACCEPT
router.put('/:clubsId', (req, res) => {
    let user_id = req.user.id
    let clubsId = req.params.clubsId
    let queryText = `UPDATE "user_clubs" SET "invite_accepted" = TRUE
                    WHERE "user_id" = $1 AND "clubs_id"= $2;`;
    pool.query(queryText, [user_id, clubsId])
    .then((result) => {
        console.log('in update invite to accept:', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('in update invite to accept ERROR:', error);
        res.sendStatus(500);
    })
})


module.exports = router;