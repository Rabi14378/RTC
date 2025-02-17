import { sign, verify } from "jsonwebtoken";
export const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyJwtToken = (token) => {
  return verify(token, process.env.JWT_SECRET);
};
