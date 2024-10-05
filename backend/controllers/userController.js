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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    // verify the token after user logged id
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            const cookie = req.cookies.sessionCookieName;
            // res.status(200).json({cookie})
            jsonwebtoken_1.default.verify(cookie, 'wRJ7pb4iYPVHg9LP', (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(200).json({ id: '', username: '', name: '', email: '', study: '', dateOfBirth: '' });
                }
                else {
                    req.userId = data;
                    const user = yield userModel_1.default.findById(req.userId);
                    if (!user) {
                        return res.status(404).json({ error: 'User not found' });
                    }
                    res.status(200).json({ id: user._id, username: user.username, name: user.name, email: user.email, study: user.study, dateOfBirth: user.dateOfBirth });
                }
            }));
            // Fetch user details using decoded token
            // const user = await userModel.findById(req.userId);
            // if (!user) {
            //   return res.status(404).json({ error: 'User not found' });
            // }
            // res.status(200).json({ id:user._id, username: user.username, name: user.name, email: user.email, study:user.study, dateOfBirth:user.dateOfBirth });
            // } catch (error) {
            //   res.status(500).json({ error: 'Internal server error' });
            // }
        });
    }
    ;
    // logout the user, here the token get deleted to log the user out
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.body;
                const existingUsername = yield userModel_1.default.findById(id);
                if (!existingUsername) {
                    return res.status(404).json({
                        msg: "Username not found",
                        success: false
                    });
                }
                const payload = {
                    _id: existingUsername._id
                };
                const accessToken = jsonwebtoken_1.default.sign(payload, 'wRJ7pb4iYPVHg9LP', {
                    expiresIn: 1
                });
                res.cookie('sessionCookieName', accessToken, { httpOnly: true });
                res.status(200).json({ success: true });
            }
            catch (error) {
                res.status(500).json({ success: false });
            }
        });
    }
    ;
    // sign up the user, check if the user with username already exist in database, if yes it gives error
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, username, email, study, password, confirm_password, dateOfBirth } = req.body;
                if (password !== confirm_password) {
                    return res.status(400).json({
                        msg: "Password do not match."
                    });
                }
                const existingUsername = yield userModel_1.default.findOne({ username });
                if (existingUsername) {
                    return res.status(400).json({
                        msg: "Username is already taken."
                    });
                }
                const existingEmail = yield userModel_1.default.findOne({ email });
                if (existingEmail) {
                    return res.status(400).json({
                        msg: "Email is already registered."
                    });
                }
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const user = new userModel_1.default({
                    name,
                    username,
                    email,
                    study,
                    password: hashedPassword,
                    dateOfBirth
                });
                yield user.save();
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    // search the user with userid and update the user
    updateProfle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id, name, username, email, study } = req.body;
                yield userModel_1.default.findByIdAndUpdate(id, { $set: { name,
                        email,
                        study } }, { new: true });
                // if (existingUsername) {
                //   return res.status(400).json({
                //     msg: "Username is already taken."
                //   });
                // }
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    // deleting the user
    deleteProfle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id, name, username, email, study } = req.body;
                // const filter = {id:id}
                // const update = {name:name,
                //                 email:email}
                yield userModel_1.default.findByIdAndDelete(id);
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    // sign in the user and generate a token
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUsername = yield userModel_1.default.findOne({ username: req.body.username });
                if (!existingUsername) {
                    return res.status(404).json({
                        msg: "Username not found",
                        success: false
                    });
                }
                bcryptjs_1.default.compare(req.body.password, existingUsername.password).then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            _id: existingUsername._id
                        };
                        const accessToken = jsonwebtoken_1.default.sign(payload, 'wRJ7pb4iYPVHg9LP', {
                            expiresIn: 604800
                        });
                        res.cookie('sessionCookieName', accessToken, { httpOnly: true });
                        res.status(200).json({ success: true });
                    }
                    else {
                        return res.status(404).json({
                            msg: "Incorrect Password",
                            success: false
                        });
                    }
                });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
}
exports.default = UserController;
