import jwt from "jsonwebtoken";
const secretKey = "player";
const token = {
  generateToken: (userData) => {
    return jwt.sign(userData, secretKey, {
      // thời gian hết hạn (tính theo milisecond) 1s=1000ml
      expiresIn: "1h",
    });
  },
  verifyToken: (token) => {
    return jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err.message);
        // sẽ cso thêm logic kiểm tra với RF để cấp lại token
        throw new Error(err.message);
      } else {
        return decoded;
      }
    });
  },
};

export { token };
