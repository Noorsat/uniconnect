const Space = require("./space.model");
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

exports.createSpace = (req, res) => {
    upload(req, res, (err) => {
        try {
            const { userId, title, description } = req.body;

            const newSpace = new Space({
                userId,
                title,
                description,
                image: {
                    data: req.file.filename,
                    contentType:'image/png'
                }
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
