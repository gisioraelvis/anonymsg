import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      didUserRead: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
