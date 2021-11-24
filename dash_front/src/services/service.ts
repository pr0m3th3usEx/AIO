import { api } from './api';
import { Widget, WidgetConfiguration } from './widget';

export type ServiceType =
  | 'GOOGLE'
  | 'WEATHER'
  | 'CRYPTO'
  | 'INTRA'
  | 'TWITTER'
  | 'REDDIT';

export type Service = {
  id: string;
  type: ServiceType;
  user_id: string;
  is_activated: boolean;
  oauth2: boolean;
  access_token: string;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
  widgets?: Widget[];
};

export type ServiceAvailable = {
  id: string;
  name: ServiceType;
  oauth2: boolean;
  isActivated: boolean;
};

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServicesAvailable: builder.query<ServiceAvailable[], void>({
      query: () => '/services/available',
    }),

    getWidgetsFromService: builder.query<WidgetConfiguration[], ServiceType>({
      query: (type) => `/services/${type}/widgets`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetServicesAvailableQuery, useGetWidgetsFromServiceQuery } =
  extendedApi;
