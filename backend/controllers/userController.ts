import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

class UserController {
  // verify the token after user logged id
  public  async verifyToken (req:Request, res:Response) {
    // try {
      const cookie = req.cookies.sessionCookieName;
      // res.status(200).json({cookie})
      jwt.verify(cookie, 'wRJ7pb4iYPVHg9LP', async (err:any, data:any) => {
      if (err) {
        return res.status(200).json({ id:'', username: '', name: '', email: '', study:'', dateOfBirth:'' } );
      } else {
        req.userId = data;
        const user = await userModel.findById(req.userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ id:user._id, username: user.username, name: user.name, email: user.email, study:user.study, dateOfBirth:user.dateOfBirth });

      }
      });
      // Fetch user details using decoded token
      // const user = await userModel.findById(req.userId);
      // if (!user) {
      //   return res.status(404).json({ error: 'User not found' });
      // }
      // res.status(200).json({ id:user._id, username: user.username, name: user.name, email: user.email, study:user.study, dateOfBirth:user.dateOfBirth });
    // } catch (error) {
    //   res.status(500).json({ error: 'Internal server error' });
    // }
  };
  // logout the user, here the token get deleted to log the user out
  public  async signOut (req:Request, res:Response) {
    try {
      let { id } = req.body
      const existingUsername = await userModel.findById(id)
      if (!existingUsername) {
        return res.status(404).json({
          msg: "Username not found",
          success: false
        });
      }
      const payload = {
        _id: existingUsername._id
      }
      const accessToken = jwt.sign(payload, 'wRJ7pb4iYPVHg9LP',{
        expiresIn: 1 
      })
      res.cookie('sessionCookieName',accessToken, {httpOnly: true})
      res.status(200).json({success:true})
    } catch (error) {
      res.status(500).json({success:false})
    }
  };
  // sign up the user, check if the user with username already exist in database, if yes it gives error
  public async signUp(req: Request, res: Response) {
    try {
      let { name,
            username,
            email,
            study,
            password,
            confirm_password,
            dateOfBirth
          } = req.body;
      if (password !== confirm_password){
        return res.status(400).json({
          msg: "Password do not match."
        })
      }
      const existingUsername = await userModel.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({
          msg: "Username is already taken."
        });
      }
      const existingEmail = await userModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          msg: "Email is already registered."
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new userModel({ 
            name,
            username,
            email,
            study,
            password: hashedPassword,
            dateOfBirth});
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // search the user with userid and update the user
  public async updateProfle(req: Request, res: Response) {
    try {
      let { id,
            name,
            username,
            email,
            study
          } = req.body;

      await userModel.findByIdAndUpdate(
        id,
        { $set:{name,
          email,
          study} }, {new:true}
      );
      // if (existingUsername) {
      //   return res.status(400).json({
      //     msg: "Username is already taken."
      //   });
      // }
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // deleting the user
  public async deleteProfle(req: Request, res: Response) {
    try {
      let { id,
            name,
            username,
            email,
            study
          } = req.body;
      // const filter = {id:id}
      // const update = {name:name,
      //                 email:email}
      await userModel.findByIdAndDelete(
        id
      );
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // sign in the user and generate a token
  public async signIn(req: Request, res: Response) {
    try {
      const existingUsername = await userModel.findOne({ username: req.body.username });
      if (!existingUsername) {
        return res.status(404).json({
          msg: "Username not found",
          success: false
        });
      }
      bcrypt.compare(req.body.password, existingUsername.password).then(isMatch => {
        if(isMatch) {
          const payload = {
            _id: existingUsername._id
          }
          const accessToken = jwt.sign(payload, 'wRJ7pb4iYPVHg9LP',{
            expiresIn: 604800
          })
          res.cookie('sessionCookieName',accessToken, {httpOnly: true})
          res.status(200).json({success:true})
        } else {
          return res.status(404).json({
            msg: "Incorrect Password",
            success: false
          });
        }
      })
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default UserController;