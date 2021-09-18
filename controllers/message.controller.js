import Message from "../models/message.model.js";
import User from "../models/user.model.js";

/**
 *@desc Search and Send message to user
 *@route POST /api/message/:username
 *@access public
 *@param {username, message}
 */
export const messageController = async (req, res) => {
  const { username } = req.query;
  const { message } = req.body;

  const userExists = await User.findOne({ username });
  if (!userExists) {
    res.status(404).json({ errorMessage: "Username not found" });
  }

  let userMessages = await Message.findById(userExists._id);
  if (!userMessages) {
    userMessages = new Message({
      user: userExists._id,
      message: [{ message }],
    });
    userMessages.save();
    res.status(200).json("Message sent successfully");
  } else {
    userMessages.message.push({ message });
    userMessages.save();
    res.status(200).json("Message sent successfully");
  }
};
