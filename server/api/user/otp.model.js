const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const otpSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 1800,
    default: Date.now(),
  },
});

const otpModel = mongoose.model('otpVerification', otpSchema);

module.exports = otpModel;
