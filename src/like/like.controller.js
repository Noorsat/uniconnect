const Like = require("./like.model");
const Post = require("./../post/post.model");
const Space = require("./../space/space.model");

exports.putLike = async (req, res) => {
    try {
        const { spaceId, postId } = req.body;

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

        const like = new Like({
            spaceId,
            postId
        })

        like.save().then(async () => {
            const newPost = await Post.findByIdAndUpdate(
                postId,
                {
                    $set:{
                        likesCount: post?.likesCount + 1
                    }   
                }
            )
            return res.status(200).json({
                success: true, 
                message: "Like created successfully"
            })
        })
    }catch (err){
        console.error("like-put-error", err.message);
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}