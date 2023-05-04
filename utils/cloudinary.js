const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dc191hcuk",
    api_key: "954782415332454",
    api_secret: "-92pQtIwCL7WK8tkk4L2grI1AAo"
  });

// exports.uploads = (file, folder) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (result) => {
//             resolve({
//                 url: result.url,
//                 id: result.public_id
//             })
//         }, {
//             resource_type: 'auto',
//             folder: folder
//         });
//     })
// }

module.exports = cloudinary;