import { routes } from '@stricjs/app';
import { json } from '@stricjs/app/send';

const Landing = routes()
  
Landing.get('/', (c) => {
  return json({message: 'landing'});
});

export default Landing;