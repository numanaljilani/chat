const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  name: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
