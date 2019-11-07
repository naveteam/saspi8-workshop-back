const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.statics.generateToken = ({ id, name, email }) => {
  return jwt.sign({ id, name, email }, process.env.JWT_KEY, {
    expiresIn: 86400
  });
};

module.exports = mongoose.model("User", userSchema);
