import multer from 'multer';
import path from 'path';
console.log("inside the multer")
// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for image uploads
  },
  filename: (req, file, cb) => {
    // Generate a unique filename by adding a timestamp to the original extension
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize multer with the defined storage settings
const upload = multer({ storage });

export default upload;
