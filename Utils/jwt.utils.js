import jwt from "jsonwebtoken";

export function verifyJWT(token, KEY) {
  try {
    const decoded = jwt.verify(token, KEY);
    return { payload: decoded, expired: null };
  } catch (error) {
    return { payload: null, expired: "Expired token" };
  }
}
