import * as env from 'env-var';

export const PORT: number = env.get('PORT').default(8080).asPortNumber();
