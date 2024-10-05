import express from 'express';
import TaskController from '../controllers/taskController';
const taskRouter = express.Router();
const settingController = new TaskController();

taskRouter.post('/changetask', settingController.changeTask)
taskRouter.get('/gettask/:id', settingController.getTask)
export default taskRouter;