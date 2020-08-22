// Dependencies
require('dotenv/config') // To store our keys
const express = require('express') // Importing express from express
const multer = require('multer') // Middleware to habdle the endpoint
const AWS = require('aws-sdk') // Importing the aws sdk to handle the code for save the image
const uuid = require('uuid').v4 // To handle repeated image names

// Creating the server with the express library
// Server configuration
const app = express() // App from express
const port = 5000 // The port where the app will be running

// Aws Configuration object storage service
const s3 = new AWS.S3({
  // Amazon Simple Storage Service (Amazon S3)
  accessKeyId: process.env.ACCESS_KEY_ID, // Given by Amazon
  secretAccessKey: process.env.SECRET_ACCESS_KEY // Given by Amazon
})

// Multer configuration (middleware)
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '') // where the files will be saved
  }
})

const upload = multer({ storage }).single('image') // Middleware setup

// Path's
// 1 HTTP POST endpoint
app.post('/upload', upload, (req, res) => {
  // File details
  let myFile = req.file.originalname.split('.') // Getting the originalname string into an array to get the info
  const fileType = myFile[myFile.length - 1] // Getting the file extension (las position of the array)
  const params = {
    // This object have information that the s3.upload need to be executed
    Bucket: process.env.BUCKET_NAME,
    Key: `${myFile[0]}.${fileType}`,
    Body: req.file.buffer
  }

  // Execution the upload function that is an instance of s3
  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error)
    }

    res.status(200).send(data)
    console.log('res --->', res)
  })

  // Get all the files that are in s3
})

// Running the server
app.listen(port, () => {
  console.log(`Server us up at this port port: ${port}`) // Printing the server port when is running
})
