import Users from "../models/users";

const verifyEmail = 
    async (tokenString: string) => (await Users.findOneAndUpdate({token: tokenString, emailVerified:false},{emailVerified:true}));

export default verifyEmail;