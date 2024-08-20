import { model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  name: string;
  picture: string;
  password?: string;
  bio?: string;
  portfolio?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const userSchema = new Schema({
  clerkId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  password: { type: String },
  bio: { type: String },
  portfolio: { type: String },
  reputation: { type: Number, default: 0 },
  saved: { type: Schema.Types.ObjectId, ref: "Question" },
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", userSchema);

export default User;
