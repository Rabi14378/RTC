import { User } from "../Model/userModel.js";
import { Token } from "../Model/tokenModel.js";
import { randomBytes, createHash } from "crypto";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { sendMail } from "../Utils/mailUtils.js";
import { verificationEmailTemplate } from "../Utils/mailTemplates.js";
import { generateToken, verifyJwtToken } from "../Utils/jwtToken.js";

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
  console.log(hashedToken);

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
  if (!token || token.category !== "verification") {
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

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    res.status(400);
    throw new Error("field cannot be empty");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("email or password is incorrect");
  }
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Either email or password is incorrect");
  }

  if (!user.isVerified) {
    res.status(401);
    throw new Error("unverified user");
  }
  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "none",
    secure: true,
    domain: "localhost",
  });
  res.status(200).json(user);
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "succesfully logged out" });
});

export const getUser = asyncHandler(async (req, res) => {
  res.status(400).json(req.user);
});
