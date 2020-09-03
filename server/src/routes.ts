import express from 'express'
import multer from 'multer'

import FileController from './Controllers/FileController'

const routes = express.Router();
const fileController = new FileController;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'src/uploads/');
    },
    filename: function (req, file, cb) {

        cb(null, 'file.txt')
    }
});
const upload = multer({ storage });

routes.post('/execute', upload.single('file'), fileController.execute);

export default routes;