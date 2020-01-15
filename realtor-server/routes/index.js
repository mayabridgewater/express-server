var express = require('express');
var router = express.Router();
var multer = require('multer');
var multer = multer;
var storage = multer.diskStorage({
  destination: 'public/images/',
  filename: function (req, file, cb) {
    cb(null, new Date().getMilliseconds() + file.originalname)
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/upload', function(req, res, next) {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>MY APP</title>
  </head>
  <body>
     
   
   <!--  SINGLE FILE -->
  <form action="/uploadfile" enctype="multipart/form-data" method="POST"> 
     <input type="file" name="myFile" />
     <input type="submit" value="Upload a file"/>
  </form>
   
   
  <!-- MULTIPLE FILES -->
   
  <form action="/apartments"  enctype="multipart/form-data" method="POST">
    Select images: <input type="file" name="myFiles" multiple>
    <input type="submit" value="Upload your files"/>
  </form>
   
    <!--   PHOTO-->
   
  <form action="/upload/photo" enctype="multipart/form-data" method="POST"> 
    <input type="file" name="myImage" accept="image/*" />
    <input type="submit" value="Upload Photo"/>
  </form>
   
   
   
  </body>
  </html>
  `);
});

// router.post('/uploadmultiple', upload.array('myFiles', 12), function(req, res, next) {
//   console.log('uploaded files', req.files, req.body);
//   let result = '';
//   for (let i = 0; i < req.files.length; i++) {
//     result += `<img src= 'images/${req.files[i].filename}'/>` 
//   }
//   res.send(result)
// });

module.exports = router;
