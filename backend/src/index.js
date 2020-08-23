// Dependencies
import dotenv from 'dotenv' // To store our Amazon keys
import express from 'express' // Importing express from express
import cors from 'cors' // To give us access to selected resources from a different origin
import bodyParser from 'body-parser'

// Importing middlewares
import upload from './middlewares/upload.js'

// Loading .env vars
dotenv.config()

// Creating the server with the express library
// Server configuration
const server = express() // App from express
const port = 5000 // The port where the app will be running

// To give us access to selected resources from a different origin
server.use(cors())

// Bodyparser
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

// Executing midlewares
upload(server) // Loading Upload middlewares

// Running the server
server.listen(port, () => {
  console.log(`Server us up at this port port: ${port}`) // Printing the server port when is running
})
