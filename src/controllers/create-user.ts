import Users, { type User } from "../models/users";


  
const CreateUser = async (body: User) => {
      const obj: any = {...body};
      const newUser = new Users(obj);
      const result = await newUser.save();
    return result;
}

export default CreateUser;