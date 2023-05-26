const Comment = require("./comment.model");
const Post = require("./../post/post.model");
const User = require("./../users/user.model");
const Space = require("./../space/space.model");
const jwt_decode = require("jwt-decode");
const multer = require('multer');

exports.createComment = async (req, res) => {
    try{
        const { spaceId, postId, comment } = req.body;

        const token = req.headers.authorization.split(" ")[1]; 
        var decoded = jwt_decode(token);

        const userId = decoded?.id;

        const user = await User.findOne({ userId });

        const space = await Space.findById(spaceId);

        if (!space){
            return res.status(404).json({
                error: true,
                message: 'Space with this id not exists'
            })
        }

        const post = await Post.findById(postId);

        if (!post){
            return res.status(404).json({
                error: true,
                message: 'Post with this id not exists'
            })
        }

        const newComment = new Comment({
            spaceId,
            postId,
            comment
        })

        newComment.save().then(async () => {
            const newPost = await Post.findByIdAndUpdate(
                postId,
                {
                    $push: {
                        comments: {
                            $each: [
                                {
                                    text: comment,
                                    user: {
                                        id: user?._id,
                                        fullname: user?.name + " " + user?.surname,
                                        image: user?.image
                                    }
                                }
                            ]
                        }
                    },
                    $set: {
                        commentsCount: post?.commentsCount + 1
                    }
                }
            );
            return res.status(200).json({
                success: true,
                message: "Comment created succesfully"
            })
        })
    }catch (err){
        console.error("comment-create-error", err.message);
        return res.status(500).json({
            error:true,
            message: error.message
        })
    }
}