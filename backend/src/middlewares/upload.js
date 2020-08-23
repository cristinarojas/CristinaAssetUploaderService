// Dependencies
import multer from 'multer' // Middleware to habdle the endpoints
import AWS from 'aws-sdk' // Importing the AWS SDK for Node.js
import { v4 as uuidv4 } from 'uuid' // To set the unique identifier for the asset
import fetch from 'node-fetch' // To do fetch in node
import bodyParser from 'body-parser'

// Exporting server file
export default server => {
  // Aws Configuration object storage service
  const s3 = new AWS.S3({
    // Amazon Simple Storage Service (Amazon S3)
    accessKeyId: process.env.ACCESS_KEY_ID, // Given by Amazon
    secretAccessKey: process.env.SECRET_ACCESS_KEY, // Given by Amazon
    httpOptions: { timeout: 60000 } // specifying a default timeout
  })

  // Multer configuration (middleware)
  const storage = multer.memoryStorage({
    // where the files will be saved
    destination: function (req, file, callback) {
      callback(null, '')
    }
  })

  // Middleware setup
  const upload = multer({ storage }).single('file') // file types

  /**************** Endpoints ****************/

  // HTTP POST endpoint: to upload the asset to and a unique identifier for the asset
  server.post('/upload', upload, (req, res, next) => {
    // Params are the path, middleware, callback

    // Getting the file details
    let myFile = req.file.originalname.split('.') // Turning the original name string into an array to get the info
    const fileType = myFile[myFile.length - 1] // Getting the file extension (las position of the array)

    // This object have information that the s3.upload need to be executed
    const params = {
      Bucket: process.env.BUCKET_NAME, // S3 bucket name (like folder name in S3)
      Key: `${uuidv4()}_${myFile[0]}.${fileType}`, // Setting the unique identifier
      Body: req.file.buffer, // Getting the file buffer
      ACL: 'public-read' // In that way we can see the files
    }

    // Execution the upload of s3
    s3.upload(params, async (error, file) => {
      // Passing the params object & callback
      const options = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      // If an error happen
      if (error) {
        options.body = JSON.stringify({
          status: 'error',
          error
        })
      } else {
        options.body = JSON.stringify({
          status: 'uploaded',
          url: file
        })
      }

      // Executing enpoin status
      const rawResponse = await fetch('http://localhost:5000/status', options)
      const { status, data } = await rawResponse.json()

      res.status(status).send(data)
    })
  })

  // PUT endpoint
  // HTTP POST endpoint: to upload the asset to and a unique identifier for the asset
  server.put('/status', (req, res, next) => {
    // Params are the path, middleware, callback
    const { status, error, url } = req.body

    if (status === 'uploaded') {
      return res.json({ status: 200, data: url })
    }

    return res.json({ status: 500, data: error })
  })

  // HTTP GET endpoint: request is made to the service for a particular asset id
  // Get file for a particular asset id
  server.get('/export/:file/:time?', (req, res, next) => {
    // ES6 Destructuring to get the file name & the time that is on the url
    const { file, time = 60 } = req.params
    // Converting time to milliseconds
    let timeout = time * 1000

    // Declaring S3 to set the timeout of the URL & see the change in the terminal
    const s3Options = {
      accessKeyId: process.env.ACCESS_KEY_ID, // Given by Amazon
      secretAccessKey: process.env.SECRET_ACCESS_KEY, // Given by Amazon
      httpOptions: { timeout }
    }

    // If we change the timeout on the ULR we can see the timaeout changed in the terminal
    console.log('s3Options.httpOptions --->', s3Options.httpOptions)

    // Aws Configuration object storage service with the s3 options that have specific timeout
    const s3WithTimeout = new AWS.S3(s3Options)

    // This object have information that the s3.upload need to be executed
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: file
    }

    // Getting the file
    s3WithTimeout.getObject(params, function (err, data) {
      // If the file name pased in the URL do not exist then show an error to the user (status 500)
      if (err) {
        res.status(500).send(`
          <p style="color: red; font-size: 28px; text-align: center; margin-top: 150px">
            I'm sorry the file:
              <span style="color: black">${file}</span>
            do not exist in Amazon S3
          </p>
        `)
      }

      // If the request was successfully (status 200)
      res.attachment(file)
      res.status(200).send(data.Body)
    })
  })

  // Get all the files that are in s3
  server.get('/files', (req, res, next) => {
    // This object have information that the s3.upload need to be executed
    let params = {
      Bucket: process.env.BUCKET_NAME
    }

    // Getting all the files that are in Amazon S3
    s3.listObjects(params, function (err, data) {
      // If an error happen throw error
      if (err) throw err

      // If the request was successfully (status 200)
      res.status(200).send(data.Contents)
    })
  })
}
