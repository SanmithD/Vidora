import cloudinary from "../config/media.config.js";
import { videoModel } from "../models/video.model.js";

export const postVideo = async (req, res) => {
  const { title, description, video } = req.body;
  const userId = req.user._id;
  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    let mediaUrl;
    if (video) {
      const mediaUploader = await cloudinary.uploader.upload(video, {
        resource_type: "auto",
        // allowed_formats: ["jpg", "png", "jpeg", "mp4", "mp3"],
      });

      mediaUrl = mediaUploader.secure_url;
    }
    const newThread = new videoModel({
      user : userId,
      title,
      description,
      video: mediaUrl || null,
    });
    if (!newThread) {
      return res.status(400).json({
        success: false,
        message: "Fail to post thought",
      });
    }
    await newThread.save();
    res.status(201).json({
      success: true,
      message: "Thought posted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const getAllVideo = async (req, res) => {
  try {
    const response = await videoModel.find().populate('user') ;
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "empty",
      });
    }
    res.status(200).json({
      success: true,
      message: "All videos",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const getVideoById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    const response = await videoModel.findById(id).populate("user");
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "empty",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const deleteVideoById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    const response = await videoModel.findByIdAndDelete({ id, user: userId });
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "empty",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};
