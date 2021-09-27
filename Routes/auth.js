const router = require('express').Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middalwares/auth");
const dotenv = require("dotenv");
dotenv.config();                        // to use .env variables

const User = require("../Models/userModel");
const Todo = require("../Models/todoModel");

// Private Route, logged In User Can Access it.
router.get("/", auth, async(req, res) => {
    try {
        // find user and show data but hide password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        res.status(500).json({err});
        console.log(err);
    }
})

router.post("/",[
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter valid password').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'User not found with provided email'});
        }
        const checkpassword = await bcrypt.compare(password, user.password);
        if(!checkpassword) {
            res.status(400).json({msg: "Password invalid"});
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.SecretKey, {
            // expiresIn:360000
        },(err, token) => {
            if(err) throw err;
            res.json({token})
        })

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get("/getTodoList/:id", async (req,res) => {
    try {
        let id = req.params.id;
        let user = await User.findById({ _id: id });
        // console.log(user.role)
        if(user.role == "admin"){
            let all_todo = await Todo.find()
            res.status(200).send({all_todo})
        }
        if(user.role == "user"){
            let todo = await Todo.findOne({ user: id });
            res.status(200).json({todo})
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;