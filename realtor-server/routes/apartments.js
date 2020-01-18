const express = require('express');
const router = express.Router();

const {getApartments, 
       byId, 
       addApartment, 
       updateApartmentHistory, 
       updateApartment} = require('../db/apartment');

const {checkPermissions} = require('../db/users');

var multer = require('multer');
// var multer = multer;
var storage = multer.diskStorage({
  destination: 'public/images/',
  filename: function (req, file, cb) {
    cb(null, new Date().getMilliseconds() + file.originalname)
  }
});
var upload = multer({ storage: storage });


router.get('/', async function(req, res, next) {
    console.log(req.query);
    try {
        const apartments = await getApartments(req.query);
        res.status(200).json(apartments)
    } catch(error) {
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

//upload.fields([{name: 'images', maxCount: 12}])

router.post('/', upload.single('main_image'), async function(req, res, next) {
    let main_image = req.file.path;
    main_image = main_image.split('/')[2];
    main_image = '/images/'+main_image;
    // console.log('images', req.files, req.files)
    try {
        const permission = await checkPermissions('add_apartment', JSON.parse(req.cookies.user));
        if (permission.length === 0) {
            res.status(400).json({error: 'Request not authorized'})
        } else {
            const newApartment = await addApartment(JSON.parse(req.cookies.user).id, req.body, main_image);
            //send images to image table
            const update = await updateApartmentHistory(newApartment[0][0].id, newApartment[0][0].user_id, newApartment[0][0].status);
            res.status(200).json('apartment added!');
        }
    } catch(error) {
        res.status(400).json({error: error.message})
    }
});

router.put('/', function(req, res, next) {
    checkPermissions('update_apartment', req.cookies.user)
      .then( results => {
          if (results.length === 0) {
            res.status(400).json({error: 'Request not authorized'})
          } else {
              updateApartment(req.body)
                .then(updateApartmentHistory(req.body.id, req.body.user_id, 'pending', 'update made'))
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