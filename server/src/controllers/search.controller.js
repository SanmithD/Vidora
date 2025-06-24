import { searchModel } from "../models/search.model.js";
import { videoModel } from "../models/video.model.js";

export const search = async (req, res) => {
  const userId = req.user;
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    const searchText = title.toLowerCase();
    const response = await videoModel.find();
    const filteredData = response.filter((data) => {
      const title = data.title?.toLocaleLowerCase() || "";

      return title.includes(searchText);
    });
    if (!filteredData) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Searched video",
      filteredData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const saveSearch = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    const response = new searchModel({
      userId: user,
      searched: id,
    });
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }
    await response.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const recentSearches = async (req, res) => {
  const userId = req.user;
  try {
    const response = await searchModel.find({ userId }).populate("searched");
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recent searches",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const removeRecentSearches = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    const response = await searchModel.findByIdAndDelete({ id, userId });
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export const removeAllRecentSearches = async (req, res) => {
  const userId = req.user;
  try {
    const response = await searchModel.findByIdAndDelete({ userId });
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};
