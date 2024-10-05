import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema (
    {
        userId: {
            type: String,
            required: true,
        },
        task: {
            type: String,
            required: true
        }
    }
)

const Task = mongoose.model("TaskModel", taskSchema)
export default Task;