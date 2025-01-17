import mongoose from "mongoose";
import { UserSchema } from "../../db/schema/users";

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({"authentication.sessionToken": sessionToken});

export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id).then((user) => user.toObject());