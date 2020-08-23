// Dependencies
import multer from 'multer' // Middleware to habdle the endpoint
import AWS from 'aws-sdk' // Importing the aws sdk to handle the code for save the image

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
      console.log('FILE====', file)
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
      Key: `${myFile[0]}.${fileType}`,
      Body: req.file.buffer
    }

    // Execution the upload function that is an instance of s3
    s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send(error)
      }

      console.log('res --->', res)
      console.log('data --->', data)

      res.status(200).send(data)
    })

    // Get all the files that are in s3
  })
}
