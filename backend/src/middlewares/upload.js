// Dependencies
import multer from 'multer' // Middleware to habdle the endpoint
import AWS from 'aws-sdk' // Importing the AWS SDK for Node.js
import { v4 as uuidv4 } from 'uuid' // To set the unique identifier for the asset

// Exporting server file
export default server => {
  // Aws Configuration object storage service
  const s3 = new AWS.S3({
    // Amazon Simple Storage Service (Amazon S3)
    accessKeyId: process.env.ACCESS_KEY_ID, // Given by Amazon
    secretAccessKey: process.env.SECRET_ACCESS_KEY, // Given by Amazon
    httpOptions: { timeout: 60000 }
  })

  // Multer configuration (middleware)
  const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, '') // where the files will be saved
    }
  })

  const upload = multer({ storage }).single('file') // Middleware setup

  // Endpoints //
  // 1 HTTP POST endpoint
  server.post('/upload', upload, (req, res, next) => {
    // File details
    let myFile = req.file.originalname.split('.') // Getting the originalname string into an array to get the info
    const fileType = myFile[myFile.length - 1] // Getting the file extension (las position of the array)
    const params = {
      // This object have information that the s3.upload need to be executed
      Bucket: process.env.BUCKET_NAME,
      Key: `${uuidv4()}_${myFile[0]}.${fileType}`,
      Body: req.file.buffer,
      ACL: 'public-read'
    }

    // Execution the upload function that is an instance of s3
    s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send(error)
      }

      res.status(200).send(data)
    })
  })

  // 3 HTTP GET endpoint
  // Get file for a particular asset id
  server.get('/export/:file/:time?', (req, res, next) => {
    // ES6 Destructuring to get the file name & the time that is on the url
    const { file, time = 60 } = req.params
    // Converting time to milliseconds
    let timeout = time * 1000

    // Re-declaring S3 to set the timeout of the URL
    const s3Options = {
      accessKeyId: process.env.ACCESS_KEY_ID, // Given by Amazon
      secretAccessKey: process.env.SECRET_ACCESS_KEY, // Given by Amazon
      httpOptions: { timeout }
    }

    // If we change the timeout on the ULR we can see the timaeout changed in the terminal
    console.log('s3Options.httpOptions --->', s3Options.httpOptions)

    //
    const s3WithTimeout = new AWS.S3(s3Options)

    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: file
    }

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
    let params = {
      Bucket: process.env.BUCKET_NAME
    }

    s3.listObjects(params, function (err, data) {
      if (err) throw err

      res.status(200).send(data.Contents)
    })
  })
}
