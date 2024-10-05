import { Request, Response, NextFunction } from 'express';
import settingModel from '../models/settingModel';
import axios from 'axios';

// setting controller for change and get the uri settings 
class settingController {
  public async changeURI(req: Request, res: Response) {
    try {
      let { userId,
            weatherURI,
            stromURI,
          } = req.body;
      const existingSetting = await settingModel.findOne({ userId });
      if (!existingSetting) {
        const setting = new settingModel({ 
          userId,
          weatherURI,
          stromURI});
        await setting.save();
        return
      } else {
        await settingModel.findByIdAndUpdate(existingSetting._id,
            { $set: {weatherURI, stromURI} } ,{new:true}
        )
      }
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  public async getURI(req: Request, res: Response) {
    try {
      let { id
          } = req.params;
      const existingSetting = await settingModel.findOne({ userId: id });
      if (!existingSetting) {
          return res.status(404).json({
            msg: "Setting not found",
            success: false
          });
      }
      const responseStrom = await axios.get(`${existingSetting.stromURI}`)

      return res.status(200).json({
          weatherURI: existingSetting.weatherURI,
          stromURI: existingSetting.stromURI,
          voltage: responseStrom.data.voltage,
          temperature: responseStrom.data.temperature
        });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default settingController;