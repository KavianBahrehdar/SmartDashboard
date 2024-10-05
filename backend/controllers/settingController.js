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
const settingModel_1 = __importDefault(require("../models/settingModel"));
const axios_1 = __importDefault(require("axios"));
// setting controller for change and get the uri settings 
class settingController {
    changeURI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { userId, weatherURI, stromURI, } = req.body;
                const existingSetting = yield settingModel_1.default.findOne({ userId });
                if (!existingSetting) {
                    const setting = new settingModel_1.default({
                        userId,
                        weatherURI,
                        stromURI
                    });
                    yield setting.save();
                    return;
                }
                else {
                    yield settingModel_1.default.findByIdAndUpdate(existingSetting._id, { $set: { weatherURI, stromURI } }, { new: true });
                }
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    ;
    getURI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                const existingSetting = yield settingModel_1.default.findOne({ userId: id });
                if (!existingSetting) {
                    return res.status(404).json({
                        msg: "Setting not found",
                        success: false
                    });
                }
                const responseStrom = yield axios_1.default.get(`${existingSetting.stromURI}`);
                return res.status(200).json({
                    weatherURI: existingSetting.weatherURI,
                    stromURI: existingSetting.stromURI,
                    voltage: responseStrom.data.voltage,
                    temperature: responseStrom.data.temperature
                });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
}
exports.default = settingController;
