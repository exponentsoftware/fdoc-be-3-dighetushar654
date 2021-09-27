const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();                        // to use .env variables



// Create user controller
exports.create_user = async (req, res) => {
    const {Username, email, password, phone, role} = req.body;
    try {
        // if user already exist
        var user = await User.findOne({email});
        if(user) {
            return res.status(400).json({ msg: 'User already exists with provided email'});
        }

        // if new user
        user = new User({
            Username,
            email,
            password,
            phone,
            role
        })
        // password converting into hashed format
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).send("User Created SuccessFully");

    } catch(err) {
        res.status(500).json(err);
    }
}
