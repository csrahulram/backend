import dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });
import { init } from '@stricjs/app';
import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL || '';

const CHAIN_CRT = process.env.CHAIN_CRT || '';
const KEY = process.env.KEY || '';
const PORT = 3000;
// Main declaration
mongoose
  .connect(DB_URL)
  .then(
    async () => {
      console.log(DB_URL);
      console.log('Database connected successfully');
      init({ routes: ['./src'] });
    },
    (err: any) => {
      console.log(err);
      console.log('Unable to connect database');
    },
  );

