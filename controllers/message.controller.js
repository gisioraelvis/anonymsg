import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { messageValidation } from "../utils/validation.js";

/**
 *@desc Search and Send message to user
 *@route POST /api/message/:username
 *@access public
 *@param {username, message}
 */
export const messageController = async (req, res) => {
  // Validate the request
  const { error } = messageValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Body with username and message
  const message = req.body;
  const username = message.username;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ message: "Username not found" });
    return;
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
    res.status(200).json({ message: "New message sent successfully" });
    return;
  } else {
    userMessages.messages.push(message);
    userMessages.save();
    res.status(200).json({ message: "Message sent successfully" });
    return;
  }
  return;
};
