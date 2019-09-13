const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET ALL BOOKCLUB DETAILS FOR ONE USER TO RENDER ON HOME PAGE
router.get('/', (req, res) => {
    console.log('in databaseRouter details GET:', req.user.id);
    
    let user_id = req.user.id
    let queryText = `SELECT "book_title", "author", "image_url", "name", "username", "published", "clubs_id", "admin_status" FROM "user_clubs"
                    JOIN "user" ON "user"."id" = "user_clubs"."user_id"
                    JOIN "clubs" ON "clubs"."id" = "user_clubs"."clubs_id"
                    WHERE "user_clubs"."user_id" = $1 ORDER BY "date" DESC ;`;
    pool.query(queryText, [user_id])
    .then((result) => {
        console.log('in GET details:', result);
        res.send(result.rows);
        
    }).catch((err) => {
        console.log('in GET details error:', err);
        res.sendStatus(500);
    })
})

//GET ONE SPECIFIC CLUB DETAILS FOR ONE USER
router.get('/:id', (req, res) => {
    console.log('in GET BY CLUB ID:', req.params);

    let user_id = req.user.id
    let club_id = req.params.id
    let queryText = `SELECT "name", "book_title", "author", "image_url", "published", "description", "admin_status" FROM "clubs"
                    JOIN "user_clubs" ON "user_clubs"."clubs_id" = "clubs"."id"
                    WHERE "clubs_id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [club_id, user_id])
    .then((result) => {
        console.log('in GET CLUB ID response:', result.rows);
        res.send(result.rows)
        
    }).catch((err) => {
        console.log('in GET CLUB ID error:', err);
        res.sendStatus(500);
    })
})

//GET DISCUSSION BOARD FOR EACH INDIVIDUAL CLUB PAGE
router.get('/discussion/:id', (req, res) => {
    console.log('in GET DISCUSSON BOARD');
    
    console.log('club_id:', req.params);
    
    let club_id = req.params.id
    let queryText = `SELECT * FROM "discussion" WHERE "clubs_id" = $1 ORDER BY "date";`;
    pool.query(queryText, [club_id])
    .then((result) => {
        console.log('in GET discussion:', result);
        res.send(result.rows)
    }).catch((error) => {
        console.log('in GET discussion error:', error);
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
                    VALUES((SELECT id FROM rows), $6, $7, $8 )`;
    pool.query(queryText, [book.name, book.book_title, book.author, book.image_url, book.description, user_id, book.invite_accepted, book.admin_status])
    .then((result) => {
        console.log('in POST:', result);
        res.send(result.rows);
        
    }).catch((err) => {
        console.log('in POST error:', err);
        res.sendStatus(500);
    })
})

//POST A DISCUSSON THREAD USING ID PARAMETER
router.post('/:id', (req, res) => {
    console.log('in Post discussons:', req.params.id);

    let user_id = req.user.id
    let club_id = req.params.id
    let content = req.body.content
    let queryText = `INSERT INTO "discussion" ("content", "user_id", "clubs_id")
                        VALUES ($1, $2, $3);`
    pool.query(queryText, [content, user_id, club_id])
    .then((result) => {
        console.log('in POST to discussion board:', result);
        res.sendStatus(200);
        
    }).catch((err) => {
        console.log('in POST  to discussion board error:', err);
        res.sendStatus(500);
    })
})





//DELETE A USER FROM USER_CLUBS TABLE: LEAVE A CLUB AS A NON ADMIN USER
router.delete('/:id', (req, res) => {
    let user_id = req.user.id
    let clubs_id = req.params.id
    let queryText = `DELETE FROM "user_clubs" WHERE "clubs_id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [clubs_id, user_id])
    .then((result) => {
        console.log('in DELETE:', result);
        res.sendStatus(200)
        
    }).catch((err) => {
        console.log('in DELETE error:', err);
        res.sendStatus(500);
        
    })
})







module.exports = router;