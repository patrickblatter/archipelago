const multer  = require('multer')
const AWS = require('aws-sdk');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.IAM_ACCESS_KEY,
    secretAccessKey: keys.IAM_SECRET_KEY,
  }
});

const bucket = 'archipelago-files';
const storage = multer.memoryStorage();
const upload = multer({ storage });


// upload multiple files
module.exports = {

  uploadImages: async(req, res, next) => {

    upload.array('images[]', 8), async (req, res, next) => {

      var params = {
        Body: req.files.buffer, 
        Bucket: bucket, 
        Key: req.files.originalname
       };
       
      s3.putObject(params)
        .on('build', req => {
          // set user metadata
          req.httpRequest.headers['x-amz-meta-user'] = req.user._id;
          req.httpRequest.headers['x-amz-meta-boatId'] = req.boat._id;
        })
        .send((err, data) => {
          if (err) { console.log(err) } 
          else {
            console.log('file uploaded');
          }
        })
      }

      
    res.stats(200).json({status: 'images uploaded'});
    }

  
}
