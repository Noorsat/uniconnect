const Post = require("./post.model");
const Space = require("./../space/space.model");
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

exports.createPost = (req, res) => {
    upload(req, res, async (err) => {
        try {
            const {spaceId, name, description} = req.body;

            console.log(req)

            const path = req.file.path;

            const result = await cloudinary.uploader.upload(path);

            const space = await Space.findById(spaceId);

            if (!space){
                return res.status(500).json({
                    error: true,
                    message: 'This space id not exists'
                })
            }

            if (name.length > 30){
                return res.status(500).json({
                    error:true,
                    message: 'Name length should be less than 30 characters'
                })
            }

            const post = new Post({
                spaceId,
                image: result.url,
                name,
                description
            })

            post.save().then(() => {
                return res.status(200).json({
                    success:true,
                    message: "Post created succesfully",
                    data: post
                })
            }).catch((error) => {
                console.error("post-create-error", error);
                return res.status(500).json({
                    error:true, 
                    message: error.message
                })
            })
        }catch (error) {
            console.error("post-create-error", error);
            return res.status(500).json({
                error:true, 
                message: error.message
            })
        } 
    })
}

exports.getPost = async (req, res) => {
    try{
        const {id} = req.params;

        const post = await Post.findById(id);
    
        if (!post){
            return res.status(500).json({
                error:true,
                message:'This post not exists'
            })
        }
    
        return res.status(200).json(post);
    }catch (err){
        console.error("get-post-error", err);
        return res.status(500).json({
            error:true,
            message: err.message
        })
    }
    
}