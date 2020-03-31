const multer = require('multer');
const path = require('path');

// image upload handling
// set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/images/',
    filename: function (req, file, cb) { //cb = callback
        cb(null, file.fieldname + '-' + req.params.id + path.extname(file.originalname));
    }
  });
  
  // init upload
  const upload = multer({
    storage: storage,
    //limit file size if needed
    limits: { fileSize: 10000000 }, //10 million bytes, 10MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
  }).single('student-image-id'); //because it's a single file
  
  // check file type
  function checkFileType(file, cb) {
    // allowed ext
    const filetypes = /jpeg|jpg|png/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime type (in case extension was changed)
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only');
    }
};
  
module.exports = {
    storage,
    upload,
    checkFileType
};