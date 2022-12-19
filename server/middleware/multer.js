const multer = require("multer");
const path = require("path");

// trouble with formdata and multer ... 
module.exports = multer({
  dest: "uploads/",
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".JPG") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});