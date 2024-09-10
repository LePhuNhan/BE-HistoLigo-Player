import playerModel from "../models/player.model.js";
import bcrypt from "bcrypt";
import { token } from "../utils/token.js";
import dotenv from "dotenv";
import t from "../utils/localization.util.js"

dotenv.config();

// dung joi de validation login vs register
const userController = {
  createUser: async (req, res) => {
    try {
      const { userName, email, password, confirmPassword } = req.body;


      if (!userName) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập tài khoản UserName!!" });
      }
      if (!email) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập tài khoản email!!" });
      }
      if (!password) {
        return res.status(400).json({ message: "Vui lòng nhập mật khẩu!!" });
      }
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập xác nhận lại mật khẩu!!" });
      }


      const existedUserName = await playerModel.findOne({ userName });
      if (existedUserName) {
        return res.status(400).json({ message: "UserName đã tồn tại!!" });
      }
      const existedEmail = await playerModel.findOne({ email });
      if (existedEmail) {
        return res.status(400).json({ message: "Email đã tồn tại!!" });
      }
      //tạo chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync();
      //thực hiện mã hóa
      const hash = bcrypt.hashSync(password, salt);
      const createdAt = new Date();
      const createdUser = await playerModel.create({
        userName,
        email,
        password: hash,
        salt,
        createdAt,
      });


      res.status(201).json({
        data: createdUser,
        message: "Tạo tài khoản thành công",
        createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { userName, password } = req.body;

      const crrUser = await playerModel.findOne({ userName });
      if (!crrUser) {
        return res
          .status(401)
          .send({ message: "Sai tài khoản" });
      }

      const isPasswordValid = bcrypt.compareSync(password, crrUser.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ message: "Sai mật khẩu" });
          
      }

      const userResponse = {
        ...crrUser.toObject(),
      };
      delete userResponse.password;
      delete userResponse.salt;

      const tkAt = token.generateToken(
        {
          userName: crrUser.userName,
          _id: crrUser._id,
          tokenType: "AT",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const tkRf = token.generateToken(
        {
          userName: crrUser.userName,
          _id: crrUser._id,
          tokenType: "RT",
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.status(200).send({
        data: {
          player: userResponse,
          accessToken: tkAt,
          refreshToken: tkRf,
        },
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  logout: async (req, res) => {
    res.status(200).json({
      message: "Đăng xuất thành công",
    });
  },
  getOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.dataToken);
      const crrUser = await playerModel.findById(id);
      if (!crrUser) throw new Error("Không tồn tại thông tin người dùng!");
      res.status(200).send({
        data: crrUser,
        message: "Thành công",
      });
    } catch (error) {
      res.status(401).send({
        message: error.message,
      });
    }
  },
};


export default userController;
