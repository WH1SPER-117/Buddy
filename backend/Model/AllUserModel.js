const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AllUserModel = mongoose.Schema(
  {
    name: {
      type: String, //dataType
      required: true, //validate
    },
    email: {
      type: String, //dataType
      required: true, //validate
      unique: true, //validate
    },
    password: {
      type: String, //dataType
      required: true, //validate
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

AllUserModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

AllUserModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const AllUser = mongoose.model("AllUser", AllUserModel);
module.exports = AllUser;
