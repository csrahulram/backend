import Users from "../models/users";

export const getUserByEmail = async (email: String) => (await Users.findOne({email:email})); 