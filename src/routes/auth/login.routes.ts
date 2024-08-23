import { jsonv } from "@stricjs/app/parser";
import { json, status } from '@stricjs/app/send';
import { vld } from "vld-ts";
import { RegisterUser } from "../../models/users";

import { getUserByEmail } from "../../controllers/get-user";
import { routes } from "@stricjs/app";

export default routes('api/v1/login')
    .state({ body: jsonv(vld(RegisterUser)) })
    .reject(() => status('Bad request', 403))
    .post('/', async ctx => {        
        const body = ctx.state.body;
        const userOfEmail = await getUserByEmail(body.email);
        if (userOfEmail?.password === body.password) 
            return json({ token: '<bearer token>' });
        else 
            return new Response('Invalid email or password', { status: 403 });
  })