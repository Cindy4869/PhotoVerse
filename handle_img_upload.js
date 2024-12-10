const path = require('path');
const multer = require('multer');
const fs = require('fs');

const imageFolder = path.join(__dirname, 'post_images');
if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageFolder);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

const uploadImg = upload.single('image');

function getImageReference(file) {
  return file.filename;
}

module.exports = {
  uploadImg,
  getImageReference
};
