// Dependencies
import multer from 'multer' // Middleware to habdle the endpoint
import AWS from 'aws-sdk' // Importing the aws sdk to handle the code for save the image
import { v4 as uuidv4 } from 'uuid'

// Exporting file
export default server => {
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
  // Get all the files that are in s3
  server.get('/files', (req, res, next) => {
    var params = {
      Bucket: process.env.BUCKET_NAME
    }

    s3.listObjects(params, function (err, data) {
      if (err) throw err

      res.status(200).send(data.Contents)
    })
  })
}
