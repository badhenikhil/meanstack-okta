const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String },
  password: { type: String },
});
schema.statics.hashPassword = function (pass) {
  return bcrypt.hashSync(pass, 10);
};
schema.methods.isValid = function (hasedPassword) {
  return bcrypt.compareSync(hasedPassword, this.password);
};

module.exports = mongoose.model("users", schema);
