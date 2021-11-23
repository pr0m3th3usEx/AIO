import * as env from 'env-var';

export const PORT: number = env.get('PORT').required(true).asPortNumber();
export const JWT_SECRET: string = env
  .get('JWT_SECRET')
  .default('secret')
  .asString();
export const REDDIT_APP_ID = env.get('REDDIT_APP_ID').required(true).asString();
export const REDDIT_APP_SECRET = env
  .get('REDDIT_APP_SECRET')
  .required(true)
  .asString();
export const FRONT_END_URL = env.get('FRONT_END_URL').required(true).asString();
