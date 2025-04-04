const bcrypt = require("bcryptjs");
const User = require("../models/user");
const util = require("util");
bcrypt.hash = util.promisify(bcrypt.hash);
bcrypt.compare = util.promisify(bcrypt.compare);


const createUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    
    if (!email || !password || !confirmPassword || (password !== confirmPassword)) {
        req.session.message = {
            status: "Danger",
            type: "danger",
            message: "Rendered dashboard successfully"
        }    
        return res.redirect("/dashboard");
    }
    try {
        const existsUser = await User.findOne({email});
        if (existsUser) {
            return res.redirect("/dashboard");
        }
        const hashedPswd = await bcrypt.hash(password, 10);
        console.log("No error occured");
        return res.redirect("/view-users");
    } catch (error) {
        console.log("Error occured");
        return res.redirect("/dashboard");
    }
}

const viewUsers = async (req, res) => {
    res.redirect("/index")
}

const updateUser = async (req, res) => {
}

const deleteUser = async () => {
        
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    viewUsers
}