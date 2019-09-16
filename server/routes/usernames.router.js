const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET THE USERNAMES LIST AND IDS TO INVITE USERS
router.get('/:username', (req, res) => {
    console.log('show req.params:', req.params.username);
    
    let username = req.params
    let queryText = `SELECT "id", "username" FROM "user" WHERE "username" LIKE $1;`;
    pool.query(queryText, [username.username])
    .then((result) => {
        console.log('in get usernames:', result);
        res.send(result.rows);

    }).catch((error) => {
        console.log('in get username error:', error);

    })
})


//POST INVITES TO DATABASE
router.post('/:clubId', (req, res) => {
    console.log('in invites POST req.body:', req.body);
    console.log('in invites POST req.body.user_id:', req.body.user_id);
    
    let clubId = req.params.clubId
    let users = req.body
    let queryText = `INSERT INTO "user_clubs" ("user_id", "clubs_id") VALUES ($1, $2);`;
    //LOOP THROUGH INVITES AND FOR EACH INVITE:

    for(each of users) {
        console.log('in FOR LOOP, each:', each);
        pool.query(queryText, [each.user_id, clubId])
        .then((result) => {
            console.log('in post invites', result);
            res.sendStatus(200); 
        }).catch((error) => {
        console.log('in post invites error:', error);
        res.sendStatus(500);
        })
    }
})






module.exports = router;