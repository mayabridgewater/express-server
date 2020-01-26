const express = require('express');
const router = express.Router();

const {getApartments, 
       byId, 
       addApartment, 
       updateApartmentHistory, 
       updateApartment} = require('../db/apartment');

const {checkPermissions} = require('../db/users');

const {postImages} = require('../db/images');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: 'public/images/',
  filename: function (req, file, cb) {
    cb(null, new Date().getMilliseconds() + file.originalname)
  }
});
var upload = multer({ storage: storage });


router.get('/', async function(req, res, next) {
    try {
        const apartments = await getApartments(req.query);
        res.status(200).json(apartments)
    } catch(error) {
        console.log(error);
        res.status(500).json(error.message)
    }
});

router.get('/:apartmentId', async function(req, res, next) {
    try {
        const apartment = await byId(req.params.apartmentId);
        res.status(200).json(apartment)
    } catch {
        res.status(500).json({error: error.message})
    }
});

// upload.fields([{name: 'images', maxCount: 12, name: 'main_image', maxCount: 1}])
// upload.single('main_image')

router.post('/', upload.fields([{name: 'images', maxCount: 12}, {name: 'main_image', maxCount: 1}]), async function(req, res, next) {
    let main_image = req.files.main_image[0].filename;
    main_image = '/images/'+main_image;
    let images = [];
    for (let i = 0; i < req.files.images.length; i++) {
        let imagePath = req.files.images[i].filename;
        imagePath = '/images/'+imagePath;
        images.push(imagePath);
    }
    try {
        const permission = await checkPermissions('add_apartment', JSON.parse(req.cookies.user));
        if (permission.length === 0) {
            res.status(400).json({error: 'Request not authorized'})
        } else {
            const newApartment = await addApartment(JSON.parse(req.cookies.user).id, req.body, main_image);
            const imageUpload = await postImages(newApartment[0][0].id, images);
            const update = await updateApartmentHistory(newApartment[0][0].id, newApartment[0][0].user_id, newApartment[0][0].status);
            res.status(200).json('apartment added!');
        }
    } catch(error) {
        res.status(400).json({error: error.message})
    }
});

router.put('/', function(req, res, next) {
    checkPermissions('update_apartment', JSON.parse(req.cookies.user))
      .then( results => {
          if (results.length === 0) {
            res.status(400).json({error: 'Request not authorized'})
          } else {
              updateApartment(req.body)
                .then(result => updateApartmentHistory(req.body.id, req.body.user_id, result[0][0].status, req.body.statusdescription))
                  .then(res.status(200).json('apartment updated, awaiting approval'))
                  .catch(error => res.status(500).json(error))

          }
    });
});


// router.post('/uploadmultiple', upload.array('myFiles', 12), function(req, res, next) {
//     console.log('uploaded files', req.files, req.body);
//     let result = '';
//     for (let i = 0; i < req.files.length; i++) {
//       result += `<img src= '../images/${req.files[i].filename}'/>` 
//     }
//     res.send(result)
//   });



module.exports = router