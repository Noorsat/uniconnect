const Space = require("./space.model");
const Post = require("./../post/post.model");
const multer = require('multer');
const cloudinary = require('../../utils/cloudinary');
const jwt_decode = require("jwt-decode");

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
            const { title, description } = req.body;

            const token = req.headers.authorization.split(" ")[1]; 
            var decoded = jwt_decode(token);
    
            const userId = decoded?.id;
            
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

        for (let i = 0; i < spaces.length; i++){
            const post = await Post.find({ spaceId: spaces[i]._id })

            spaces[i].postCount = post?.length;
        }

        if (spaces?.length === 0){
            return res.status(500).json({
                error:true,
                message:"Don't have any spaces"
            })
        }

        return res.status(200).json(spaces);
    } catch (error){
        console.error("spaces-get-error", error);
        return res.status(500).json({
            error:true,
            message: error.message
        })
    }
}

exports.getSpace = async (req, res) => {
    try{
        const {id} = req.params;

        const space = await Space.findById(id);

        const posts = await Post.find({ spaceId: space._id});

        space.posts = posts;

        if (!space){
            res.status(500).json({
                error: true,
                message: 'This space not created'
            })
        }

        res.status(200).json(space);
    } catch (error){
        console.error("space-get-error", error);
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}