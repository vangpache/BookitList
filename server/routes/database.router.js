const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET TOP THREE MOST RECENT BOOKCLUB DETAILS FOR HOME PAGE CARDS
router.get('/', (req, res) => {
    console.log('in databaseRouter details GET:', req.user.id);
    
    let user_id = req.user.id
    let queryText = `SELECT "book_title", "author", "image_url", "name", "username", "published", "clubs_id" FROM "user_clubs"
                    JOIN "user" ON "user"."id" = "user_clubs"."user_id"
                    JOIN "clubs" ON "clubs"."id" = "user_clubs"."clubs_id"
                    WHERE "user_clubs"."user_id" = $1 ORDER BY "date" DESC LIMIT 3 ;`;
    pool.query(queryText, [user_id])
    .then((result) => {
        console.log('in GET details:', result);
        res.send(result.rows);
        
    }).catch((err) => {
        console.log('in GET details error:', err);
        res.sendStatus(500);
    })
})

//POST NEW CLUB AND INSERT DATA INTO JUNCTION TABLE
router.post('/', (req, res) => {
    console.log('in databaseRouter POST new club:', req.body);
    
    let user_id = req.user.id
    let book = req.body
    let queryText = `WITH rows AS(
                    INSERT INTO "clubs" ("name", "book_title", "author", "image_url", "description")
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id)
                    INSERT INTO "user_clubs" ("clubs_id", "user_id", "invite_accepted", "admin_status")
                    VALUES((SELECT id FROM rows), $6, $7, $8 ) RETURNING id;`;
    pool.query(queryText, [book.name, book.book_title, book.author, book.image_url, book.description, user_id, book.invite_accepted, book.admin_status])
    .then((result) => {
        console.log('in POST:', result);
        res.sendStatus(200);
        
    }).catch((err) => {
        console.log('in POST error:', err);
        res.sendStatus(500);
    })
})







module.exports = router;