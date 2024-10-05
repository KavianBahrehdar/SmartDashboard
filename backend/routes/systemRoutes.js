"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const systeminformationController_1 = __importDefault(require("../controllers/systeminformationController"));
const systemRouter = express_1.default.Router();
const systemController = new systeminformationController_1.default();
systemRouter.get('/memory', systemController.getMemory);
// settingRouter.get('/getsetting/:id', systemController.getURI)
exports.default = systemRouter;
