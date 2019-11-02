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

//update user profile
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

module.exports = router;