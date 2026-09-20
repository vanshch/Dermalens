import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const uploadsDirectory = fileURLToPath(new URL('../uploads/', import.meta.url));
fs.mkdirSync(uploadsDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Add .single('file') to match the field name you're sending
const upload = multer({ storage }).single('file');

export default upload;
