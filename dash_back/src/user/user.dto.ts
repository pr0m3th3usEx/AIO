import { User } from '.prisma/client';

export type CleanedUser = Omit<User, 'password'>;
