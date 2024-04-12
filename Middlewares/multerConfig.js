const multer = require("multer");
const path = require("path");

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    return cb(new Error("Only image files are allowed"), false);
  }

  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destPath = path.join(__dirname, "../public/images");
    // console.log("Destination Path:", destPath);
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    // console.log("Original Filename:", file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = upload;
