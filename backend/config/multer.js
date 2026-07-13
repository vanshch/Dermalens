import multer from 'multer';
import path from 'path';

console.log("inside the multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Add .single('file') to match the field name you're sending
const upload = multer({ storage }).single('file');

export default upload;