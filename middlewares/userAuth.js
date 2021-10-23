import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      res.status(403).json({ errorMessage: "Not authorized, token failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ errorMessage: "Not authorized, no token" });
    return;
  }
};

export default authenticate;
