import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  hashKey: process.env.AUTH_HASH_KEY,
}));
