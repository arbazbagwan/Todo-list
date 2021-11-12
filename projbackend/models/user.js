var mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require("uuid");


var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            minlength:3,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        encry_password: {
            type: String,
            required: true,
            minlength:3,
        },
        salt: String,
    },
    { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuid.v1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });
  
  userSchema.methods = {
    autheticate: function(plainpassword) {
      return this.securePassword(plainpassword) === this.encry_password;
    },
  
    securePassword: function(plainpassword) {
      if (!plainpassword) return "";
      try {
        return crypto
          .createHmac("sha256", this.salt)
          .update(plainpassword)
          .digest("hex");
      } catch (err) {
        return "";
      }
    }
  };
  
module.exports = mongoose.model("User", userSchema);
