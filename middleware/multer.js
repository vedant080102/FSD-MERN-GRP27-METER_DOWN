var multer = require('multer')
var GoogleDriveStorage = require('multer-google-drive')
const driveAuth=require("../config/gdrive")
const {google} = require('googleapis');

var drive = google.drive({version: 'v3', auth:driveAuth})
 
var uploadCoverImage = multer({
  storage: GoogleDriveStorage({
    drive: drive,
    parents: '110Xv29JzP3roUgLu65rE62rOxMJPAMd3',
    fileName: function (req, file, cb) {
      let filename = `${file.originalname}`;
      cb(null, filename);
    }
  })
})

var uploadProfileImage = multer({
    storage: GoogleDriveStorage({
      drive: drive,
      parents: '110Xv29JzP3roUgLu65rE62rOxMJPAMd3',
      fileName: function (req, file, cb) {
        let filename = `${file.originalname}`;
        cb(null, filename);
      }
    })
  })

  var uploadEventImage = multer({
    storage: GoogleDriveStorage({
      drive: drive,
      parents: '110Xv29JzP3roUgLu65rE62rOxMJPAMd3',
      fileName: function (req, file, cb) {
        let filename = `${file.originalname}`;
        cb(null, filename);
      }
    })
  })
  
  var upload = multer({
    storage: GoogleDriveStorage({
      drive: drive,
      parents: '1MMn1X8N_umRfp-4ivE1-8WFBWXVrBzpU',
      fileName: function (req, file, cb) {
        let filename = `${file.originalname}`;
        cb(null, filename);
      }
    })
  })
  

module.exports={upload,uploadCoverImage,uploadEventImage,uploadProfileImage}