const Space = require("./space.model");
const multer = require('multer');
const cloudinary = require('../../utils/cloudinary');

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
  })
  
  const upload = multer({
    storage: Storage
  }).single('image') 

exports.createSpace = (req, res) => {
    upload(req, res, async (err) => {
        try {
            const { userId, title, description } = req.body;
            
            const path = req.file.path;

            const result = await cloudinary.uploader.upload(path);

            const newSpace = new Space({
                userId,
                title,
                description,
                image: result.url
            })

            newSpace.save().then(() => {
                return res.status(200).json({
                    success:true,
                    message: "Succesfully create space",
                    newSpace
                })
            }).catch((err) => {
                console.log(err);
            })
        }catch (error){
            console.error("space-create-error", error);
            return res.status(500).json({
                error: true,
                message: error.message
            })
        }
    })
}

exports.getSpaces = async (req, res) => {
    try {
        const spaces = await Space.find();

        if (spaces?.length === 0){
            return res.status(500).json({
                error:true,
                message:"Don't have any spaces"
            })
        }

        return res.status(200).json({
            success:true,
            message: 'Succesfully get spaces',
            data: spaces
        })
    } catch (error){
        console.error("spaces-get-error", error);
        return res.status(500).json({
            error:true,
            message: error.message
        })
    }
}
