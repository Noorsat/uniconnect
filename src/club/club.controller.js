const Club = require("./club.model");
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
  }).single('logo') 

exports.createClub = (req, res) => {
    upload(req, res, async (err) => {
        try {
            const {name, description, headId} = req.body;

            console.log(req.files)

            const path = req.file.path;

            const result = await cloudinary.uploader.upload(path);

            const newClub = new Club({
                name: name,
                description: description,
                headId: headId,
                logo: result.url
            })

            newClub.save().then(() => {
                return res.status(200).json({
                    success:true,
                    message: "Succesfully uploaded",
                    newClub
                })
            }).catch((err) => {
                console.log(err);
            }) 
        }catch (error){
            console.error("club-create-error", error);
            return res.status(500).json({
            error: true,
            message: error.message,
        });
        }
    })
}


exports.getClubs = async (req, res) => {
    try {
        const clubs = await Club.find();

        if (clubs.length === 0){
            return res.status(400).json({
                error:true,
                message: "Don't have any clubs"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Success",
            data: clubs
        })
    }catch (error){
        console.error("clubs-get", error);
            return res.status(500).json({
            error: true,
            message: error.message,
        })
    }
}

exports.getClub = async (req, res) => {
    try {
        const { id } = req.params;

        const club = await Club.findById(id);

        if (!club){
            return res.status(404).json({
                error:true,
                message: 'No club with this id'
            })
        }

        return res.status(200).json({
            success:true,
            data: club
        })
    } catch (error){
            console.error("clubs-get", error);
            return res.status(500).json({
            error: true,
            message: error.message,
        })
    }
}