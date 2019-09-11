const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET TOP THREE MOST RECENT BOOKCLUB DETAILS FOR HOME PAGE CARDS
router.get('/', (req, res) => {
    console.log('in databaseRouter details GET:', req.user_id);
    
    let user_id = req.user.id
    let queryText = `SELECT "book_title", "author", "image_url", "name", "username", "published" FROM "user_clubs"
                    JOIN "user" ON "user"."id" = "user_clubs"."user_id"
                    JOIN "clubs" ON "clubs"."id" = "user_clubs"."clubs_id"
                    WHERE "user_clubs"."user_id" = $1;`;
    pool.query(queryText, [user_id])
    .then((result) => {
        console.log('in GET details:', result);
        res.send(result.rows);
        
    }).catch((err) => {
        console.log('in GET details error:', err);
        res.sendStatus(500);
    })
})





module.exports = router;