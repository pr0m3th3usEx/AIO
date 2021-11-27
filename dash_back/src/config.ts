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

export const TWITTER_CLIENT_ID = env
  .get('TWITTER_CLIENT_ID')
  .required(true)
  .asString();
export const TWITTER_API_KEY = env
  .get('TWITTER_API_KEY')
  .required(true)
  .asString();
export const TWITTER_API_KEY_SECRET = env
  .get('TWITTER_KEY_SECRET')
  .required(true)
  .asString();
export const TWITTER_BEARER_TOKEN = env
  .get('TWITTER_BEARER_TOKEN')
  .required(true)
  .asString();

export const COINAPI_KEY = env.get('COINAPI_KEY').required(true).asString();
export const FRONT_END_URL = env.get('FRONT_END_URL').required(true).asString();
