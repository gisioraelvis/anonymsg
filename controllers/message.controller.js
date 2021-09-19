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
  const message = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ errorMessage: "Username not found" });
  }
  
  //search by user id on Message model
  let userMessages = await Message.findOne({ user: user._id });

  /**
   * if userMessages is null then create new message object and add to user object in db
   * else add to existing message array in db
   */

  if (!userMessages) {
    userMessages = new Message({
      user: user._id,
      messages: [message],
    });
    userMessages.save();
    res.status(200).json("New message sent successfully");
  } else {
    userMessages.messages.push(message);
    userMessages.save();
    res.status(200).json("Message sent successfully");
  }
};
