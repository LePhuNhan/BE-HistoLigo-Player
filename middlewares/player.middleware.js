import { token } from "../utils/token.js";

const middlewares = {
  verifyJwt: (checkRT) => {
    return (req, res, next) => {
      try {
        // lấy token được gửi lên ra
        if (!req.headers.authorization) throw new Error("Bạn chưa đăng nhập!");
        const tk = req.headers.authorization.split(" ")[1];
        if (!tk) throw new Error();
        // kiểm tra token
        const data = token.verifyToken(tk);
        if (checkRT) {
          if (data.tokenType !== "RT") throw new Error("Token không hợp lệ!");
        } else {
          if (data.tokenType === "RT") throw new Error("Token hợp lệ!");
        }

        req.dataToken = data;
        req.token = tk;
        next();
      } catch (error) {
        res.status(401).send({
          message: error.message ?? "Bạn không thể thực hiện hành động!",
          data: null,
        });
      }
    };
  },
};

export default middlewares;
