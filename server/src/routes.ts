import express from 'express';
import FileController from './Controllers/FileController';

const routes = express.Router();
const fileController = new FileController;

routes.post('/execute', fileController.execute);

export default routes;