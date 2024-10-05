"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settingController_1 = __importDefault(require("../controllers/settingController"));
const settingRouter = express_1.default.Router();
const settingController = new settingController_1.default();
settingRouter.post('/changesetting', settingController.changeURI);
settingRouter.get('/getsetting/:id', settingController.getURI);
exports.default = settingRouter;
