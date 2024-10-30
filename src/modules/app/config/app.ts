import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME_A,
  port: parseInt(process.env.APP_PORT_A ?? '80') || 80,
  debug: process.env.APP_DEBUG === 'true',
}));
