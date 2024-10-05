import mongoose, { Schema } from "mongoose";

const settingSchema = new Schema (
    {
        userId: {
            type: String,
            required: true,
        },
        weatherURI: {
            type: String,
            required: true
        },
        stromURI: {
            type: String,
            required: true
        }
    }
)

const Setting = mongoose.model("SettingModel", settingSchema)
export default Setting;