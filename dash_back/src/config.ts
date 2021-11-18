import * as env from 'env-var';

export const PORT: number = env.get('PORT').default(8080).asPortNumber();
export const JWT_SECRET: string = env
  .get('JWT_SECRET')
  .default('secret')
  .asString();
