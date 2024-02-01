import userResolvers from "./userResolvers";
import contactResolvers from "./contactResolvers";

export default {
  ...userResolvers,
  ...contactResolvers,
}