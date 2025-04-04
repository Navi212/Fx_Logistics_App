const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    role: {
        type: String,
        default: "User",
        enum: ["Admin", "User"]
    }
},
{ timeStamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;