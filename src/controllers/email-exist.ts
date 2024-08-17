import Users from "../models/users";

export default async function EmailExist(email: String){
    const result = await Users.findOne({email:email});
    if(result){
        return true;
    } else {
        return false;
    }
    
}