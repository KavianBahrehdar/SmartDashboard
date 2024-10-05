"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = __importDefault(require("../controllers/taskController"));
const taskRouter = express_1.default.Router();
const settingController = new taskController_1.default();
taskRouter.post('/changetask', settingController.changeTask);
taskRouter.get('/gettask/:id', settingController.getTask);
exports.default = taskRouter;
