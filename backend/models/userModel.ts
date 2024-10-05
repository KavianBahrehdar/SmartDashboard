import mongoose, { Schema } from "mongoose";

const userSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false
        },
        study: {
            type: String,
            required: false
        },
        password : {
            type: String,
            required: true
        },
        dateOfBirth : {
            type: Date,
            required: true
        }

    }
)

const User = mongoose.model("UserModel", userSchema)
export default User;