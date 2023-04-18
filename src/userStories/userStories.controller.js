const UserStories = require("./userStories.model");
const multer = require('multer');

const Storage = multer.diskStorage({
    destination:'uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({
    storage: Storage
  }).single('image') 

exports.createStories = (req, res) => {
    upload(req, res, (err) => {
        try {
            const {userId} = req.body;

            console.log(userId);
            console.log(req.file)

            const newUserStories = new UserStories({
                userId: userId, 
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })

            newUserStories.save().then(() => {
                return res.status(200).json({
                    success:true,
                    message: "Succesfully uploaded",
                    newUserStories
                })
            }).catch((err) => {
                console.log(err);
            }) 
        }catch (error){
            console.error("userStories-upload-error", error);
            return res.status(500).json({
            error: true,
            message: error.message,
        });
        }
    })
}

exports.getStories = async (req, res) => {
    try {
        const stories = await UserStories.find();

        if (stories.length === 0){
            return res.status(400).json({
                error:true,
                message: "Don't have any stories"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Success",
            data: stories
        })
    }catch (error){
        console.error("userStories-get", error);
            return res.status(500).json({
            error: true,
            message: error.message,
        })
    }
}