import mongoose, { Schema } from 'mongoose';

const userRoles = ['user', 'admin'] as const;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      required: true,
      enum: userRoles,
      default: 'user',
    },
  },
  { 
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
  },
);

export type UserRole = (typeof userRoles)[number];

export const UserModel =
  mongoose.models.User ?? mongoose.model('User', userSchema);
