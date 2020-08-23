// Dependencies
import dotenv from 'dotenv' // To store our keys
import express from 'express' // Importing express from express
import cors from 'cors'
import bodyParser from 'body-parser'

// Middlewares
import upload from './middlewares/upload.js'

// Loading .env vars
dotenv.config()

// Creating the server with the express library
// Server configuration
const server = express() // App from express
const port = 5000 // The port where the app will be running

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

// Executing midlewares
upload(server) // Loading Upload middlewares

// Running the server
server.listen(port, () => {
  console.log(`Server us up at this port port: ${port}`) // Printing the server port when is running
})
