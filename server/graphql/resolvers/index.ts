import userResolvers from "./userResolvers";
import sendEmailResolvers from "./sendEmailResolvers";

export default {
  ...userResolvers,
  ...sendEmailResolvers,
}