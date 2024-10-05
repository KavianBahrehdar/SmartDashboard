import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import  Systeminformation  from 'systeminformation';


class systemController {
  // get the memory information
  public async getMemory(req: Request, res: Response) {
    try {
    
      const response = await Systeminformation.mem();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export default systemController;