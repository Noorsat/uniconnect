const Event = require("./event.model");
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

exports.createEvent = (req, res) => {
    upload(req, res, async (err) => {
        try {
            const {name, date, location, description, price, allSeats, booked, clubId, responsibleUserId } = req.body;

            const path = req.file.path;

            const result = await cloudinary.uploader.upload(path);

            const event = new Event({
                name,
                date,
                location,
                description,
                price,
                allSeats,
                booked,
                clubId, 
                responsibleUserId,
                image: result.url
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