import { api } from './api';
import { Service } from './service';
import { Widget } from './widget';

export type User = {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
  widgets?: Widget[];
  services?: Service[];
};

export type RegistrationUserDto = {
  username: string;
  email: string;
  password: string;
  rePassword: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type AccessToken = {
  access_token: string;
  user: User;
};

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => '/user/me',
      providesTags: ['User'],
    }),
    login: builder.mutation<AccessToken, LoginUserDto>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<AccessToken, RegistrationUserDto>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useLoginMutation, useRegisterMutation } =
  extendedApi;
