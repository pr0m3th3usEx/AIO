import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from 'env-var';
import { RootState } from 'utils/store';

const API_URL = env.get('REACT_APP_API_URL').required(true).asString();

export const api = createApi({
  tagTypes: ['User', 'Widget', 'Service'],
  reducerPath: 'dashApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
