import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from "./userResolvers";
import newsletterResolver from "./newsletterResolver";

const resolvers = mergeResolvers([userResolvers, newsletterResolver]);

export default resolvers;