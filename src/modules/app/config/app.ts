import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME_B,
  port: parseInt(process.env.APP_PORT_B ?? '80') || 80,
  debug: process.env.APP_DEBUG === 'true',
}));
