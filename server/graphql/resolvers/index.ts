import userResolvers from "./userResolvers";
import productResolvers from "./productResolvers";

export default {
  ...userResolvers,
  ...productResolvers
}