const express = require('express');
const router = express.Router();

const {getApartments, 
       byId, 
       addApartment, 
       updateApartmentHistory, 
       updateApartment,
       getNumOfApartments} = require('../db/apartment');

const {checkPermissions} = require('../db/users');

const {postImages, deleteImages} = require('../db/images');

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
        const amount = await getNumOfApartments(req.query);
        res.status(200).json({apartments: apartments, amount: amount})
    } catch(error) {
        res.status(404).json({error: error.message})
    }
});

router.get('/:apartmentId', async function(req, res, next) {
    try {
        const apartment = await byId(req.params.apartmentId);
        res.status(200).json(apartment)
    } catch {
        res.status(404).json({error: error.message})
    }
});


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
            res.status(403).json({error: 'Request not authorized'})
        } else {
            const newApartment = await addApartment(JSON.parse(req.cookies.user).id, req.body, main_image);
            const imageUpload = await postImages(newApartment[0][0].id, images);
            const update = await updateApartmentHistory(newApartment[0][0].id, newApartment[0][0].user_id, newApartment[0][0].status);
            res.status(200).json('apartment added!');
        }
    } catch(error) {
        res.status(401).json({error: 'not valid'})
    }
});

router.put('/', upload.fields([{name: 'new_images', maxCount: 10}, {name: 'new_main_image', maxCount: 1}]), async function(req, res, next) {
    let new_main_image = undefined;
    let new_image_list = [];
    if(req.files) {
        if (req.files.new_main_image) {
            new_main_image = req.files.new_main_image[0].filename;
            new_main_image = '/images/'+new_main_image;
        }
        if (req.files.new_images) {
            for (let i = 0; i < req.files.new_images.length; i++) {
                let imagePath = req.files.new_images[i].filename;
                imagePath = '/images/'+imagePath;
                new_image_list.push(imagePath);
            }
        }
    }
    try {
        const permission = await checkPermissions('update_apartment', JSON.parse(req.cookies.user))
            if (permission.length === 0) {
                res.status(403).json({error: 'Request not authorized'})
            } else {
                const updateApt = await updateApartment(req.body, new_main_image);
                if(req.body.image) {
                    const deleteImgs = await deleteImages(req.body.id, req.body.image);
                }
                if (new_image_list.length) {
                    const postImgs = await postImages(req.body.id, new_image_list);
                }
                const history = await updateApartmentHistory(req.body.id, req.body.user_id, updateApt[0][0].status, req.body.statusdescription);
                res.status(200).json('apartment updated, awaiting approval')
            } 
    }catch(error) {
        res.status(401).json({error: error.message})
    }
});



module.exports = router