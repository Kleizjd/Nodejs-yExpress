const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  data: {
    type: { age: Number, isMale: Boolean }
  },
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' }
});

const model = mongoose.model('User', userSchema);

module.exports = model;
