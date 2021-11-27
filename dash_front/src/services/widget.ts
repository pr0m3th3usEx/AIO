import { IsArray, IsInt, IsPositive, IsString, IsUUID } from 'class-validator';
import { api } from './api';
import { ServiceType } from './service';

export type ParameterType = 'INTEGER' | 'STRING';

export type WidgetType =
  | 'TRANSLATOR'
  | 'CITY_TEMPERATURE'
  | 'CRYPTO'
  | 'INTRA_MODULE_INFO'
  | 'INTRA_USER_INFO'
  | 'USER_TWEETS'
  | 'SUBREDDIT';

export type WidgetParameter = {
  id: string;
  name: string;
  widget_id: string;
  type: ParameterType;
  value_int: number | null;
  value_string: string | null;
  created_at: Date;
  updated_at: Date;
};

export type Widget = {
  id: string;
  type: WidgetType;
  user_id: string;
  service_id: string;
  refresh_rate: number;
  created_at: Date;
  updated_at: Date;
  last_refresh: Date | null;
  parameters: WidgetParameter[];
};

export type AddWidgetFields = {
  refresh_rate: number;
  type: WidgetType;
  serviceName: ServiceType;
};

export type ExchangeRate = {
  time: Date;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
};

export class CreateWidgetDto {
  type: WidgetType;
  @IsUUID()
  service_id: string;
  @IsInt({ message: 'Refresh rate must be positive' })
  @IsPositive({ message: 'Refresh rate must be positive' })
  refresh_rate: number;
  @IsArray({ message: 'Parameters must be an array' })
  parameters: WidgetParameterDto[];
}

export class WidgetParameterDto {
  @IsString()
  name: string;
  value: string | number;
}

export type WidgetParameterConfiguration = {
  name: string;
  type: 'string' | 'integer';
};

export type WidgetConfiguration = {
  name: string;
  type: WidgetType;
  description: string;
  params: WidgetParameterConfiguration[];
};

export type UpdateWidgetParameterDto = {
  widget_id: string;
  refresh_rate: number;
  parameters: WidgetParameterDto[];
};

export type Tweet = {
  created_at: Date;
  id: string;
  text: string;
  author_id: string;
};

export type TwitterUser = {
  name: string;
  profile_image_url: string;
  id: string;
  username: string;
};

export type UserTweets = {
  tweets: Tweet[];
  user: TwitterUser;
};

export type Thing<T> = {
  id?: string;
  name?: string;
  kind: string;
  data: T;
};

export type List<T> = {
  before: string;
  after: string;
  modhash: string;
  children: T[];
};

export type Post = {
  data: {
    author: string;
    subreddit: string;
    title: string;
    url: string;
    media?: any;
    score: number;
    likes: number;
    clicked: boolean;
    thumbnail: string;
  };
};

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewWidget: builder.mutation<Widget, CreateWidgetDto>({
      query: (body) => ({
        url: '/widgets',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Widget'],
    }),
    updateWidget: builder.mutation<Widget, UpdateWidgetParameterDto>({
      query: (params) => ({
        url: `/widgets/${params.widget_id}`,
        method: 'PUT',
        body: {
          parameters: params.parameters,
          refresh_rate: params.refresh_rate,
        },
      }),
      invalidatesTags: ['Widget'],
    }),
    removeWidget: builder.mutation<boolean, string>({
      query: (params) => ({
        url: `/widgets/${params}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Widget'],
    }),
    refreshWidget: builder.mutation<void, string>({
      query: (params) => `/widgets/${params}/refresh`,
    }),
    getUserWidgets: builder.query<Widget[], void>({
      query: () => '/widgets/all',
      providesTags: ['Widget'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddNewWidgetMutation,
  useUpdateWidgetMutation,
  useRemoveWidgetMutation,
  useRefreshWidgetMutation,
  useGetUserWidgetsQuery,
} = extendedApi;
