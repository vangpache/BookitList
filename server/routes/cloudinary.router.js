const express = require('express');
const router = express.Router();
require('dotenv').config();

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    apikey: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
})



module.exports = router;