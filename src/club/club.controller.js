const Club = require("./club.model");
const multer = require('multer');

const Storage = multer.diskStorage({
    destination:'uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({
    storage: Storage
  }).single('logo') 

exports.createClub = (req, res) => {
    upload(req, res, (err) => {
        try {
            const {name, description, headId} = req.body;

            const newClub = new Club({
                name: name,
                description: description,
                headId: headId,
                logo: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
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