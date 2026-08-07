const User = require("../models/User");

const generateToken = require("../utils/generateToken");

exports.register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      phone,
    } = req.body;

    const exists =
      await User.findOne({ email: email.toLowerCase().trim() });

    if (exists) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const user =
      await User.create({
        name,
        email: email.toLowerCase().trim(),
        phone,
        password,
      });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    res.json({
      success: true,

      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.profile = async (
  req,
  res
) => {
  res.json({
    success: true,
    user: req.user,
  });
};