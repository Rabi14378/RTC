import { User } from "../Model/userModel";
export const Protect = asyncHandler(async (req, res, next) => {
  const token = await req.cookies.token;
  if (!token) {
    res.status(404);
    throw new Error("token unavailable");
  }
  const isVerified = await verifyJwtToken(token);
  if (!isVerified) {
    res.status(401);
    throw new Error("could not verify token");
  }
  const user = await User.findById(isVerified.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("no user");
  }
  req.user = user;
  next();
});
