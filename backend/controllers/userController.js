import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user =  await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message:"User does not exist"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message:"Incorrect password"});
        }
        
        const token = createToken(user._id);
        res.json({success: true, token});
    }
    catch(error){
        console.log(error);
        res.json({success: false, message:"Login failed"});
    }    
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // Checking if user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success: false, message:"User already exists"});
        }

        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message:"Please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success: false, message:"Password must be at least 8 characters long"});
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, token});
    }
    
    catch(error){
        console.log(error);
        res.json({success: false, message:"Registration failed"});
    }
}

export {loginUser, registerUser}