import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    orders:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      }
    ],
    whisLists:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WhisList",
      }
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasShippingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: {
        type: String, 
      },
      lastName: {
        type: String, 
      },
      address: {
        type: String, 
      },
      city: {
        type: String, 
      },
      postCode: {
        type: String, 
      },
      province: {
        type: String, 
      },
      country: {
        type: String, 
      },
      phone: {
        type: String, 
      },
    },
  },{
    timestamps: true
  }
);

// complie the scheme
const User = mongoose.model('user', UserSchema);

export default User;