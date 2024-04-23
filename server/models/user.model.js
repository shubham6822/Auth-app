import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }, password: {
        type: String,
        require: true,
    },
    profilephoto: {
        type: String,
        default: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"

    }
}, { timestamps: true });

const User = mongoose.model("userdata", userSchema);

export default User;