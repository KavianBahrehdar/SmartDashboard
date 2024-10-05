import express from 'express';
import UserController from '../controllers/userController';
import userModel from '../models/userModel';
const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/profile', userController.verifyToken);
userRouter.patch('/updateProfile', userController.updateProfle)
userRouter.post('/deleteProfile', userController.deleteProfle)
userRouter.post('/signout', userController.signOut)

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
export default userRouter;