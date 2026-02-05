const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema defines what a "user" looks like in the database
// ELI10: Think of this like a blueprint for user documents in MongoDB
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Pre-save hook: hash password before saving user
userSchema.pre('save', async function () {
  // Only hash password if it was modified or is new
  // ELI10: If the user didn't change their password, don't hash again.
  if (!this.isModified('password')) return;

  // ELI10: Turn the plain password into a "scrambled" version before saving.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare given password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

