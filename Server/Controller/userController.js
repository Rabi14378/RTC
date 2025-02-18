import { User } from "../Model/userModel";
import { Token } from "../Model/tokenModel";
import { randomBytes, createHash } from "crypto";

export const Registration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password)
    throw new Error("all field should be filled");
  if (password.length < 8)
    throw new Error("password should be atleast 8 leter");

  try {
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      res.status(409);
      throw new Error("Email already exists!");
    }
  } catch (error) {
    throw new Error(error);
  }

  try {
    const user = await User.create({
      name: firstName + " " + lastName,
      email,
      password,
    });
    if (user) {
      const verifyToken = randomBytes(32).toString("hex") + user._id;
      const hashedToken = createHash("sha256")
        .update(verifyToken)
        .digest("hex");
      try {
        await Token.create({
          userId: user._id,
          token: hashedToken,
        });
      } catch (error) {
        throw new Error("could not add token to database");
      }
    }
  } catch (error) {
    throw new Error("sorry could not add user to database");
  }
};
