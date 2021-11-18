import * as env from 'env-var';

export const PORT: number = env.get('PORT').required(true).asPortNumber();
export const JWT_SECRET: string = env
  .get('JWT_SECRET')
  .default('secret')
  .asString();
