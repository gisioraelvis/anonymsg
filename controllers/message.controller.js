import message from "../models/message.model.js";

/**
 *@desc Search and Send message to user
 *@route POST /api/message/:username
 *@access public
 *@param {message} req - The request object
 */
export const messageController = (req, res) => {
  const { user } = req.params;
  res.json(`Ananymouse message for ${user}`);
};
