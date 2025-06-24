import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.lib.js";
import { userModel } from "../models/user.model.js";
import { videoModel } from "../models/video.model.js";

export const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashPassword,
    });
    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "Failed to signup",
      });
    }
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "New user registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if(!isPassword){
        return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = generateToken(existingUser._id, res );
    if(!token){
        return res.status(400).json({
        success: false,
        message: "Fail to token",
      });
    }
    res.status(200).json({
        success: true,
        message: "Login success",
        token,
        email
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const profile = async(req, res) =>{
    const userId = req.user;
    if(!userId){
        return res.status(404).json({
        success: false,
        message: "Invalid request",
      });
    }
    try {
        const response = await userModel.findById(userId).select('-password');
        const videos = await videoModel.find({ user: userId })
        if(!response){
        return res.status(400).json({
        success: false,
        message: "empty",
      });
    }
    res.status(200).json({
        success: true,
        message: "User profile",
        response,
        videos
      });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
      });
      console.log(error);
    }
}

export const deleteAccount = async(req, res) =>{
    const userId = req.user;
    if(!userId){
        return res.status(404).json({
        success: false,
        message: "Invalid request",
      });
    }
    try {
        const response = await userModel.findByIdAndDelete(userId);
        if(!response){
        return res.status(400).json({
        success: false,
        message: "empty",
      });
    }
    res.status(200).json({
        success: true,
        message: "User profile deleted",
        response
      });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
      });
      console.log(error);
    }
}