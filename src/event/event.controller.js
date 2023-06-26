const Event = require("./event.model");
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
  }).array('images')

exports.createEvent = (req, res) => {
    upload(req, res, async (err) => {
        try {
            const { title, date, time, description, clubId, cardNumber, price, ticketCount } = req.body;

            let linksArray = [];
            let storyLink = "";

            const token = req.headers.authorization.split(" ")[1]; 

            var decoded = jwt_decode(token);
    
            const userId = decoded?.id;

            console.log(req.files)
            console.log(req.file)

            for (let i = 0; i < req.files.length-1; i++){
                const path = req.files[i].path;

                const result = await cloudinary.uploader.upload(path);

                linksArray.push(result?.url);
            }

            const path = req.files[req.files.length-1].path;

            const result = await cloudinary.uploader.upload(path);

            storyLink = result?.url;

            const event = new Event({
                title,
                date,
                time,
                description,
                clubId,
                cardNumber,
                price,
                ticketCount,
                userId,
                images: linksArray,
                storyImage: storyLink,
            })

            event.save().then(() => {
                return res.status(200).json({
                    success:true,
                    message: 'Succesfully created event',
                    event
                })
            }).catch((err) => {
                return res.status(400).json({
                    error:true,
                    message: err
                })
            })
        }catch (error) {
            console.error("event-create-error", error);
            return res.status(500).json({
                error:true, 
                message: error.message
            })
        } 
    })
}

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();

        if (events.length === 0){
            return res.status(400).json({
                error:true,
                message: "Don't have any events"
            })
        }

        return res.status(200).json({
            success:true,
            message:'Success get events',
            data: events
        })
    }catch (error){
        console.error("event-get-error", error);
        return res.status(500).json({
            error:true,
            message: error.message
        })
    }
}

exports.getMyEvents = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; 

        var decoded = jwt_decode(token);

        const userId = decoded?.id;

        const events = await Event.find({userId: userId});

        if (events.length === 0){
            return res.status(500).json({
                error: true,
                message: "You don't have events"
            })
        }

        return res.status(200).json({
            success:true,
            data: events
        })
    } catch (error){
        console.error("get-myevents-error", error);
        return res.status(500).json({
            error:true,
            message: error.message
        })
    }
}