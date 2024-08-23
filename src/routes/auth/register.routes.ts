import { routes } from '@stricjs/app';
import { jsonv } from '@stricjs/app/parser';
import { json, status } from '@stricjs/app/send';
import { t, vld } from 'vld-ts';
import EmailExist from '../../controllers/email-exist';
import SendEmail from '../../controllers/send-email';
import { RegisterUser } from '../../models/users';
import CreateUser from '../../controllers/create-user';

export default routes('api/v1/registration')
  .state({ post: jsonv(vld(RegisterUser)) })
  .reject(() => status('Bad request', 403))
  .post('/', async ctx => {
    console.log(ctx);
    
    const body = ctx.state.post;
    const emailExist = await EmailExist(body.email);
    if (emailExist) {
      return new Response('Email already exist.', { status: 403 })
    }

    const user = await CreateUser({ email: body.email, password: body.password})

    if(user.uid) {
      const email = new SendEmail();

      await email.send({
        recipients: [body.email],
        subject: 'Email Verification',
        message: `Please verify your account. Click here to <a href="http://localhost:3000/account/activation/${user.token}">verify.</a>`
      });
      return json({ message: 'registration done successfully.' });
    }
    else {
      return json({ message: 'registration failed.' })
    }
  })