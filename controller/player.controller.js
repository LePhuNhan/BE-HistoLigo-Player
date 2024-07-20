import PlayerModel from "../models/player.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { createPlayer, invalidatePlayer } from "../Utils/PlayerHandler.js";
import { blacklisted } from "../middlewares/validToken.middleware.js";

// login
const playerLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) return res.status(400).send(["email", "password"]);
  const player = await PlayerModel.findOne({ email: email });
  if (!player) return res.status(400).send(["email", "password"]);
  if (player && !password) return res.status(400).send(["password"]);
  const compare = await bcrypt.compare(password, player.password);
  if (!compare) return res.status(400).send(["password"]);

  // create Player
  const Player = await createPlayer(player._id);
  //create token
  const accessToken = jwt.sign(
    { playerId: player._id, PlayerId: Player._id },
    process.env.ACCESS_KEY,
    {
      expiresIn: "5m",
    }
  );
  const refressToken = jwt.sign(
    { PlayerId: Player._id },
    process.env.REFRESH_KEY,
    {
      expiresIn: "24h",
    }
  );
  // save token to ccookie
  res.cookie("access_token", accessToken, {
    maxAge: 900000,
  });
  res.cookie("refresh_token", refressToken, {
    maxAge: 8.64e7,
  });
  res.send({ PlayerId: Player._id, playerId: player._id, playerRole: player.role });
};

// logout
const playerLogout = async (req, res) => {
  const { PlayerId } = req.player;
  await invalidatePlayer(PlayerId);
  blacklisted.add(req.player.access_token);
  blacklisted.add(req.player.refresh_token);

  await res.cookie("access_token", "", {
    maxAge: 0,
  });
  res.cookie("refresh_token", "", {
    maxAge: 0,
  });

  res.send("log out successfully");
};

// signup
const playerSignup = async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;
  // check an array off error to FE render red outline in the form

  if (!name || !email || !password)
    return res
      .status(400)
      .send(["email", "password", "name", "repeatPassword"]);
  const exist = await PlayerModel.findOne({ email });

  if (exist) return res.status(400).send(["email"]);
  if (!validator.isStrongPassword) return res.status(400).send(["password"]);
  if (password !== repeatPassword)
    return res.status(400).send(["repeatPassword"]);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  await PlayerModel.create({ name, password: hash, email, role: ["guest"] });

  return res.status(200).send("signup successful");
};

export { playerLogin, playerSignup, playerLogout };
