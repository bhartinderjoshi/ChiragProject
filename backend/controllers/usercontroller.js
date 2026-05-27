
import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
//signup
export const signup = async (req,res) => {
    try{
    const {name, email, password} = req.body;

    //check if email already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message:"Email already exists, please login"
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        
        //create new user
        const newUser = new User({name, email, password:hashedPassword});
        await newUser.save();

        res.status(201).json({success: true, message:"Signup successful", user: newUser});
    }catch(error){
        res.status(500).json({success: false, message:"Signup failed", error:error.message});
    }
};

    //login
    export const login = async (req,res) => {
        try{
            const{email,password} = req.body;

            //find user
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({success: false, message:"User not found. Please sign up first"});
            }
            
            //compare pass
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({success: false, message:"Invalid password"});
            }

            res.status(200).json({success: true, message:"Login successful", user});
        }catch(error){
            res.status(500).json({success: false, message:"Error logging in", error:error.message});
        }
    }