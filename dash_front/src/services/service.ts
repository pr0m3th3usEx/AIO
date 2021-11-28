import { api } from './api';
import { Widget, WidgetConfiguration } from './widget';

export type ServiceType =
  | 'GOOGLE'
  | 'WEATHER'
  | 'CRYPTO'
  | 'INTRANET'
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

export type ServiceURLResponse = {
  authorize_url: string;
};

export type ServiceActivationDto = {
  service_id?: string;
  serviceType: ServiceType;
  activated: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export type ServiceAuthorizationTokens = {
  access_token: string;
  refresh_token: string;
};

export type ServiceAuthorizationDto = {
  url: string;
  serviceType: ServiceType;
};

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServicesAvailable: builder.query<ServiceAvailable[], void>({
      query: () => '/services/available',
    }),

    getWidgetsFromService: builder.query<WidgetConfiguration[], ServiceType>({
      query: (type) => `/services/${type}/widgets`,
    }),

    getServiceAuthorizationUrl: builder.query<ServiceURLResponse, ServiceType>({
      query: (type) => `/services/service_url?serviceType=${type}`,
    }),

    activateService: builder.mutation<Service, ServiceActivationDto>({
      query: (body) => ({
        url: '/services',
        method: 'POST',
        body,
      }),
    }),

    getTokens: builder.mutation<
      ServiceAuthorizationTokens,
      ServiceAuthorizationDto
    >({
      query: (body) => ({
        url: '/services/tokens',
        method: 'POST',
        body,
      }),
    }),

    getServiceInfo: builder.query<Service, string>({
      query: (param) => ({
        url: `/services/${param}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetServicesAvailableQuery,
  useGetWidgetsFromServiceQuery,
  useGetServiceAuthorizationUrlQuery,
  useActivateServiceMutation,
  useGetTokensMutation,
  useGetServiceInfoQuery,
} = extendedApi;
