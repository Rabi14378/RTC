import { User } from "../Model/userModel.js";
import { Token } from "../Model/tokenModel.js";
import { randomBytes, createHash } from "crypto";
import asyncHandler from "express-async-handler";
import { sendMail } from "../Utils/mailUtils.js";
import { verificationEmailTemplate } from "../Utils/mailTemplates.js";

export const Registration = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password)
    throw new Error("all field should be filled");
  if (password.length < 8)
    throw new Error("password should be atleast 8 leter");

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    res.status(409);
    throw new Error("Email already exists!");
  }

  const user = await User.create({
    name: firstName + " " + lastName,
    email,
    password,
  });
  if (!user) throw new Error("could not add user to database");
  const verifyToken = randomBytes(32).toString("hex") + user._id;
  const hashedToken = createHash("sha256").update(verifyToken).digest("hex");
  const token = await Token.create({
    userId: user._id,
    token: hashedToken,
  });
  if (!token) throw new Error("could not add token to db");

  const mailContent = {
    subject: "Email Verification",
    message: verificationEmailTemplate(token, process.env.CLIENT_URL),
  };
  const mailResponse = await sendMail(user.email, mailContent);
  res.status(200).json({ msg: "user created succesfully!" });
});

export const verifyToken = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  //todo:check if token is in the database and also check if has expired
  //todo:if expired send expired message to frontend and from front end make a request to send another verification token
  //todo: if token in available and not expired verify the user and and also add the cookie
});
