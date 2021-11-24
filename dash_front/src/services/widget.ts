import { IsArray, IsInt, IsPositive, IsString, IsUUID } from 'class-validator';
import { api } from './api';
import { ServiceType } from './service';

export type ParameterType = 'INTEGER' | 'STRING';

export type WidgetType =
  | 'TRANSLATOR'
  | 'CITY_TEMPERATURE'
  | 'CRYPTO'
  | 'INTRA'
  | 'TWITTER'
  | 'SUBREDDIT';

export type WidgetParameter = {
  id: string;
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
  parameters: Widget[];
};

export type AddWidgetFields = {
  refresh_rate: number;
  type: WidgetType;
  serviceName: ServiceType;
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
  }),
  overrideExisting: false,
});

export const { useAddNewWidgetMutation } = extendedApi;
