import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    selected_service: [
      {
        service_provider: { type: String },
        appointed_service: { type: String },
        appointed_price: { type: Number },
      },
    ],
    userAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
    },
  },
  {
    timestamps: true,
  }
);

export const customer = mongoose.model("Customer", customerSchema);
