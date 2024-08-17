import { routes } from "@stricjs/app";
import verifyEmail from "../../controllers/verify-email";
import { json } from "@stricjs/app/send";

const activation = routes()
  
activation.get('api/v1/activation/:token', async (c) => {
    const res = await verifyEmail(c.params.token);
    if(res?.uid)
        return json({ message: 'Email verified successfully.' });
    else
        return new Response('Invalid token.', { status: 403 })
});

export default activation;
 