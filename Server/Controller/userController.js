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
  const token = await Token.findOne({ token: verificationToken });
  if (!token) {
    res.status(404);
    throw new Error("Could not find the token");
  }

  if (token.expiresAt < Date.now()) {
    const deletedToken = await Token.deleteOne({ _id: token._id });
    if (!deletedToken) throw new Error("could not delete expired token");
    res.status(410).json({ msg: "Token has expired" });
  }

  const user = await User.updateOne(
    { _id: token.userId },
    { isVerified: true }
  );
  if (!user) throw new Error("could not update user database");
  const actualToken = await Token.deleteOne({ _id: token._id });
  res.status(200).json({ msg: "user successfully verified!" });

  //todo:maybe implement a transaction here!!
});
