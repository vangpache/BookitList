const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET ALL BOOKCLUB DETAILS FOR ONE USER TO RENDER ON HOME PAGE
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in databaseRouter details GET:', req.user.id);
    
    let user_id = req.user.id
    let queryText = `SELECT "book_title", "author", "image_url", "name", "username", "clubs_id", "admin_status", "invite_accepted" FROM "user_clubs"
                    JOIN "user" ON "user"."id" = "user_clubs"."user_id"
                    JOIN "clubs" ON "clubs"."id" = "user_clubs"."clubs_id"
                    WHERE "user_clubs"."user_id" = $1 AND "user_clubs"."invite_accepted" = TRUE ORDER BY "date" DESC ;`;
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
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in GET BY CLUB ID:', req.params);

    let user_id = req.user.id
    let club_id = req.params.id
    let queryText = `SELECT "clubs"."id", "name", "book_title", "author", "image_url", "description", "admin_status" FROM "clubs"
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
router.get('/discussion/:id', rejectUnauthenticated, (req, res) => {
    console.log('in GET DISCUSSON BOARD');
    
    console.log('club_id:', req.params);
    
    let club_id = req.params.id
    let queryText = `SELECT "discussion"."id", "content", "clubs_id", "user_id", "date", "username" FROM "discussion"
                    JOIN "user" ON "user"."id" = "discussion"."user_id"
                    WHERE "clubs_id" = $1 ORDER BY "date" DESC;`;
    pool.query(queryText, [club_id])
    .then((result) => {
        console.log('in GET discussion:', result);
        res.send(result.rows)
    }).catch((error) => {
        console.log('in GET discussion error:', error);
        res.sendStatus(500);
    })
})

//GET MEETUPS FOR CLUB ID
router.get('/meetup/get/:id', rejectUnauthenticated, (req, res) => {
    console.log('in get meetups:', req.params.id);
    let club_id = req.params.id
    let queryText = `SELECT * from "meetups" WHERE "clubs_id" = $1 ORDER BY "meetups"."date" DESC;`;

    pool.query(queryText,[club_id])
    .then ((result) => {
        console.log('get meetups:', result.rows);
        res.send(result.rows)
        
    }).catch((err) => {
        res.sendStatus(500);
    })
    
})



//POST NEW CLUB AND INSERT DATA INTO JUNCTION TABLE
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in databaseRouter POST new club:', req.body);
    
    let user_id = req.user.id
    let book = req.body
    let queryText = `WITH rows AS(
                    INSERT INTO "clubs" ("name", "book_title", "author", "image_url", "description")
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id)
                    INSERT INTO "user_clubs" ("clubs_id", "user_id", "invite_accepted", "admin_status")
                    VALUES((SELECT id FROM rows), $6, $7, $8 ) RETURNING *`;
    pool.query(queryText, [book.name, book.book_title, book.author, book.image_url, book.description, user_id, book.invite_accepted, book.admin_status])
    .then((result) => {
        console.log('in POST:', result.rows[0].clubs_id);
        res.send(result.rows[0]);
        
    }).catch((err) => {
        console.log('in POST error:', err);
        res.sendStatus(500);
    })
})

//POST A DISCUSSON THREAD USING ID PARAMETER
router.post('/:id', rejectUnauthenticated, (req, res) => {
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

//POST A NEW MEETUP FOR CLUB
router.post('/meetup/post', rejectUnauthenticated, (req, res) => {
    console.log('in post meetup:', req.body);

    let club_id = req.body.clubId;
    let date = req.body.date;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
    let location = req.body.location;
    let notes =  req.body.notes;
    let user_id = req.user.id;
    let queryText = `INSERT INTO "meetups" ("date", "start_time", "end_time", "location", "notes", "clubs_id", "user_id")
                        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
    
    pool.query(queryText, [date, start_time, end_time, location, notes, club_id, user_id])
    .then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        res.sendStatus(500)
    })
})



//DELETE A USER FROM USER_CLUBS TABLE: LEAVE A CLUB AS A NON ADMIN USER
router.delete('/:id', rejectUnauthenticated, (req, res) => {
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


//DELETE A CLUB COMPLETELY FROM CLUBS AND USER_CLUBS TABLE: AUTH AS ADMIN NEEDED
router.delete('/deletemyclub/:id', rejectUnauthenticated, (req, res) => {
    let clubs_id = req.params.id
    let queryText = `WITH row AS(DELETE FROM "clubs" WHERE "id" = $1)
                    DELETE FROM "user_clubs" WHERE "user_clubs"."clubs_id" = $1;`;
    pool.query(queryText, [clubs_id])
    .then((result) => {
        console.log('in DELETE MY CLUB:', result);
        res.sendStatus(200)
    }).catch((error) => {
        console.log('in DELETE MY CLUB:', error);
    })
})

router.put('/', rejectUnauthenticated, (req, res) => {

    let updates = req.body
    let queryText = `UPDATE "clubs" SET "name" = $1, "book_title" = $2, "author" = $3, "image_url" = $4, "description" = $5
                    WHERE "id" = $6;`;
    pool.query(queryText, [updates.name, updates.book_title, updates.author, updates.image_url, updates.description, updates.clubId])
    .then((result) => {
        console.log('in update details:', result);
        res.sendStatus(200);
        
    }).catch((error) => {
        console.log('in update details error:', error); 
    })
});







module.exports = router;