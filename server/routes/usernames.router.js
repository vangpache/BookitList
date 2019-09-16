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







module.exports = router;