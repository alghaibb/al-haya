import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from "./userResolvers";
import sendEmailResolvers from "./sendEmailResolvers";

const resolvers = mergeResolvers([userResolvers, sendEmailResolvers]);

export default resolvers;