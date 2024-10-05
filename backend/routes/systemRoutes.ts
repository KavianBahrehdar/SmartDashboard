import express from 'express';
import SystemController from '../controllers/systeminformationController';
const systemRouter = express.Router();
const systemController = new SystemController();

systemRouter.get('/memory', systemController.getMemory)
// settingRouter.get('/getsetting/:id', systemController.getURI)
export default systemRouter;