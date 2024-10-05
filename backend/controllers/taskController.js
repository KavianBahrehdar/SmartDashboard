"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskModel_1 = __importDefault(require("../models/taskModel"));
class taskController {
    // change the task, search the task with userid and update it
    changeTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { userId, task, } = req.body;
                const existingTask = yield taskModel_1.default.findOne({ userId });
                if (!existingTask) {
                    const tasks = new taskModel_1.default({
                        userId,
                        task
                    });
                    yield tasks.save();
                    return;
                }
                else {
                    yield taskModel_1.default.findByIdAndUpdate(existingTask._id, { $set: { task } }, { new: true });
                }
                res.status(201).json({ message: 'Task created successfully' });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    ;
    // get the task with user id
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                const existingTask = yield taskModel_1.default.findOne({ userId: id });
                if (!existingTask) {
                    return res.status(404).json({
                        msg: "Setting not found",
                        success: false
                    });
                }
                return res.status(200).json({
                    task: existingTask.task
                });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
}
exports.default = taskController;
