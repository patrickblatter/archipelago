const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
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



router.route('/')
  .post(
    upload.single('image1'), async (req, res, next) => {
      var params = {
        Body: req.file.buffer, 
        Bucket: bucket, 
        Key: req.file.originalname
       };
      s3.putObject(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('file uploaded');
        }

      })
    }

    
  )



module.exports = router;