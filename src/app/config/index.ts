import dotenv from 'dotenv';
import path from 'path';
const defaultPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: defaultPath });
export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL
};