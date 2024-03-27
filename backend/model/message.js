const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now }

});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
