const Joi = require("joi");

const userData = require("../db/user.json");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const fromNo = process.env.TWILIO_NUMBER;

const getAllUsers = async (req, res) => {
  try {
    if (userData.length) {
      return res.status(200).json({
        status: true,
        data: userData,
        message: "Data sent successfully",
      });
    } else {
      return res
        .status(404)
        .json({ status: false, data: null, message: "Data not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching users!",
      data: null,
    });
  }
};

const getUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let validator = Joi.object({
      user_id: Joi.string().required("user Id is required"),
    });
    validator = validator.validate({
      user_id: userId,
    });
    if (validator.error) {
      return res
        .status(400)
        .json({ status: false, message: validator.error.message, data: null });
    }
    userId = parseInt(userId);
    const userInfo = userData.find((user) => user.id === userId);
    // res.json(userInfo);
    if (userInfo) {
      return res.status(200).json({
        status: true,
        data: userInfo,
        message: "Data sent successfully",
      });
    } else {
      return res
        .status(404)
        .json({ status: false, data: null, message: "Data not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching user!",
      data: null,
    });
  }
};

const sendSms = async (req, res) => {
  try {
    const body = req.body;
    let validator = Joi.object({
      message: Joi.string().required("message is required"),
      phone_no: Joi.string().required("phone number is required"),
    });
    validator = validator.validate({
      message: body.message,
      phone_no: body.phoneNo,
    });
    if (validator.error) {
      return res
        .status(400)
        .json({ status: false, message: validator.error.message, data: null });
    }
    const message = await client.messages.create({
      body: body.message,
      from: fromNo,
      to: body.phoneNo,
    });
    res
      .status(200)
      .json({ status: true, message: "sms sent successfully", data: null });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while sending sms, Try again!",
      data: null,
    });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  sendSms,
};
