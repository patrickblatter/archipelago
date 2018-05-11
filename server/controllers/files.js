// const multer  = require('multer')
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const keys = require('../config/keys');
const Boat = require('../models/boat');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.IAM_ACCESS_KEY,
    secretAccessKey: keys.IAM_SECRET_KEY,
  }
});

const bucket = 'archipelago-files';


// upload multiple files
module.exports = {

  uploadImages: async(req, res, next) => {
    console.log(req.files)
    const { newBoat, user } = req;


      req.files.forEach(image => {
        filename = uuidv4();
        newBoat.images.push(filename);

        var params = {
          Body: image.buffer, 
          Bucket: bucket, 
          Key: filename
         };
      
      s3.putObject(params)
        .on('build', req => {
          // set user metadata
          req.httpRequest.headers['x-amz-meta-user'] = user._id;
          req.httpRequest.headers['x-amz-meta-boatId'] = newBoat._id;
        })
        .send((err, data) => {
          if (err) { console.log(err) } 
          else {
            console.log('file uploaded');
          }
        })
      });

      const result = await newBoat.save();
      if(result.err) {
        console.log(result);
        return res.sendStatus(400);
      }
      
      res.status(200).json({
        boat: 'Successfully added',
        images: 'Sucessfully uploaded'
      });
    }

  
}
