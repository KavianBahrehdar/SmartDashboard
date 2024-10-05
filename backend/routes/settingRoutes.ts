import express from 'express';
import SettingController from '../controllers/settingController';
const settingRouter = express.Router();
const settingController = new SettingController();

settingRouter.post('/changesetting', settingController.changeURI)
settingRouter.get('/getsetting/:id', settingController.getURI)
export default settingRouter;