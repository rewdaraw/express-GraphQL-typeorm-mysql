import { GraphQLID, GraphQLString } from "graphql";

import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";

export const CREATE_USER = {
  type: UserType, // MEMO: ReturnのType
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;
    await Users.insert({ name, username, password });
    return args;
  },
};

export const UPDATE_PASSWORD = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;

    const user = await Users.findOne({ username: username });
    const userPassword = user?.password; // get user old password

    if (userPassword === oldPassword) {
      return await Users.update(
        { username: username },
        { password: newPassword }
      );
    } else {
      throw new Error("PASSWORD DOES NOT MATCH!");
    }
  },
};

export const DELETE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Users.delete(id);
  },
};
