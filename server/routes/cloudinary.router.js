const express = require('express');
const router = express.Router();
require('dotenv').config();
const pool = require('../modules/pool');

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    apikey: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
})

//update user profile image
router.put('/', (req, res) => {
    console.log('image url is:', req.body.url);
    let profile_image = req.body.url
    let user = req.user.id
    let queryText = `UPDATE "user" SET "profile_image" = $1
                    WHERE "id" = $2;`;
    
    pool.query(queryText, [profile_image, user])
    .then((result) => {
        res.sendStatus(201)  
    }).catch((err) => {
        res.sendStatus(500)
    })
})

//update user profile information
router.put('/updateprofile', (req, res) => {
    console.log(req.body);
    let currently_reading = req.body.currently_reading
    let favorite_author = req.body.favorite_author
    let favorite_book = req.body.favorite_book
    let favorite_quote = req.body.favorite_quote
    let user = req.user.id
    let queryText = `UPDATE "user" SET "currently_reading" = $1, "favorite_author" = $2, "favorite_book" = $3, "favorite_quote" =$4
                        WHERE "id" = $5;`
    pool.query(queryText, [currently_reading, favorite_author, favorite_book, favorite_quote, user])
    .then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
    })
})

module.exports = router;