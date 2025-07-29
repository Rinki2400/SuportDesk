const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

//hash password before saving
UserSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    const mysalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,mysalt);
    next()
});


module.exports = mongoose.model('users', UserSchema);