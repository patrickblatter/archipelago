// const multer  = require('multer')
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const keys = require('../config/keys');
const Boat = require('../models/boat');
const bucket = 'archipelago-files';
const cloudinary = require('cloudinary');
const parallel =  require('async/parallel');

cloudinary.config({ 
  cloud_name: 'dwwlgy1ov', 
  api_key: '127259176468435', 
  api_secret: 'Y7g4byfvptC5TywOXSdKrzha3DE' 
});
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.IAM_ACCESS_KEY,
    secretAccessKey: keys.IAM_SECRET_KEY,
  }
});

const validateFiles = (files) => {
  let jpegExtension = 'FFD8FF', // 6
      pngExtension = '89504E470D0A1A0A', // 16
      gifExtension = '474946383761'; // 12

  const validFiles = [];

  files.forEach(file => {

    let mimeType = file.buffer.toString('hex').substring(0,16);
    
    if(mimeType.startsWith(jpegExtension.toLowerCase())) {
      let fileExtension = '.jpg';
      // create ID
      file.filename = uuidv4() + fileExtension;
      validFiles.push(file)
    }


    if(mimeType.startsWith(pngExtension.toLowerCase())) {
      let fileExtension = '.png';
      // create ID
      file.filename = uuidv4() + fileExtension;
      validFiles.push(file)
    }

    if(mimeType.startsWith(gifExtension.toLowerCase())) {
      let fileExtension = '.gif';
      // create ID
      file.filename = uuidv4() + fileExtension;
      validFiles.push(file)
    }
  });
  return validFiles;
}

// const uploadPromise = function(image, user, newBoat) {
//   return new Promise((resolve, reject) => {
//    cloudinary.uploader.upload_stream((result) => {
//       resolve(result)
//     }, {
//       public_id: image.filename, 
//       tags: [`${user._id}`, `${newBoat._id}`],
//       quality: 'auto'
//     }).end(image.buffer);
//   })
// }

// upload multiple files
module.exports = {

  uploadImages: async (req, res, next) => {
    const { newBoat, user } = req;
    const validFiles = validateFiles(req.files);

    if(validFiles.length < 1) {
      return res.status(415).json({ Error: 'Invalid File Type'});
    }


    // CLOUDINARY OPTION
    // promises = []
    // validFiles.forEach((image) => {
    //   promises.push(uploadPromise(image, user, newBoat)
    //   .then(result => {
    //     newBoat.images.push({public_id: image.filename, url: result.secure_url});
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // )});

    // await Promise.all(promises);

    // console.log(newBoat)
    
    
    const base = 'https://s3.eu-central-1.amazonaws.com/archipelago-files/'
    validFiles.forEach(image => {
      var params = {
        Body: image.buffer, 
        Bucket: bucket, 
        Key: image.filename
      };
        
      s3.putObject(params)
        .on('build', req => {
          // set user metadata
          req.httpRequest.headers['x-amz-meta-user'] = user._id;
          req.httpRequest.headers['x-amz-meta-boatId'] = newBoat._id;
        })
        .send((err, data) => {
          if (err) { console.log(err) }
          console.log(data)
        })
      newBoat.images.push(base + image.filename)
    })
    
    
    
    const result = await newBoat.save();
    if(result.err) {
      // console.log(result);
      return res.sendStatus(400);
    }
      
    res.status(201).json({ boat: newBoat });
  }
}
