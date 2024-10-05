import { Request, Response, NextFunction } from 'express';
import taskModel from '../models/taskModel';
import axios from 'axios';


class taskController {
  // change the task, search the task with userid and update it
  public async changeTask(req: Request, res: Response) {
    try {
      let { userId,
            task,
          } = req.body;
      const existingTask = await taskModel.findOne({ userId });
      if (!existingTask) {
        const tasks = new taskModel({ 
          userId,
          task});
        await tasks.save();
        return
      } else {
        await taskModel.findByIdAndUpdate(existingTask._id,
            { $set: {task} } ,{new:true}
        )
      }
      res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  // get the task with user id
  public async getTask(req: Request, res: Response) {
    try {
      let { id
          } = req.params;
      const existingTask = await taskModel.findOne({ userId: id });
      if (!existingTask) {
          return res.status(404).json({
            msg: "Setting not found",
            success: false
          });
      }
      return res.status(200).json({
          task: existingTask.task
        });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default taskController;