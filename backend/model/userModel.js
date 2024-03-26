const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name:String
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports = User;