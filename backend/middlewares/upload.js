import multer from "multer";

// Storage 
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  }
});

// Upload
const upload = multer({
  storage: storage
});

export default upload;