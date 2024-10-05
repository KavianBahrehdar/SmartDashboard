"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userRouter = express_1.default.Router();
const userController = new userController_1.default();
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/profile', userController.verifyToken);
userRouter.patch('/updateProfile', userController.updateProfle);
userRouter.post('/deleteProfile', userController.deleteProfle);
userRouter.post('/signout', userController.signOut);
// userRouter.get('/profile', userController.verifyToken, async (req, res) => {
//     try {
//         // Fetch user details using decoded token
//         const user = await userModel.findOne({ email: req.body.email });
//         if (!user) {
//           return res.status(404).json({ error: 'User not found' });
//         }
//         res.status(200).json({ username: user.username, email: user.email });
//       } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//       }
// })
exports.default = userRouter;
