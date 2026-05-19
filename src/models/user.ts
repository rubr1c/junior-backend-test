import {
  Schema,
  model,
  models,
  type HydratedDocument,
  type InferSchemaType,
  type Model,
} from 'mongoose';

const userRoles = ['user', 'admin'] as const;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: userRoles,
      default: 'user',
    },
  },
  { timestamps: true },
);

export type UserRole = (typeof userRoles)[number];
export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;

export const UserModel =
  (models.User as Model<User> | undefined) ??
  model<User>('User', userSchema);
