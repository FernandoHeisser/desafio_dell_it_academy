import express, { request } from 'express'
import multer from 'multer'
import path from 'path';

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

const upload = multer({ storage, fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.txt') {
        req.params.fileNameValidator = '406';
    }

    cb(null, true);
}});

routes.post('/execute', upload.single('file'), fileController.upload);
routes.get('/execute', fileController.execute);

export default routes;