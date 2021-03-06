import { GraphQLID, GraphQLString } from "graphql";

import { UserType } from "../TypeDefs/User";
import { MessageType } from "../TypeDefs/Message";
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
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;

    const user = await Users.findOne({ username: username });

    if (!user) {
      throw new Error("USERNAME DOES NOT EXIST!");
    }

    const userPassword = user?.password; // get user old password

    if (userPassword === oldPassword) {
      await Users.update({ username: username }, { password: newPassword });

      return {
        successful: true,
        message: "USER PASSWORD UPDATED!",
      };
    } else {
      throw new Error("PASSWORD DOES NOT MATCH!");
    }
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Users.delete(id);
    return {
      successful: true,
      message: "USER DELETED!",
    };
  },
};
