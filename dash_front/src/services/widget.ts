export type ParameterType = 'INTEGER' | 'STRING';

export type WidgetType =
  | 'TRANSLATOR'
  | 'CITY_TEMPERATURE'
  | 'CRYPTO'
  | 'INTRA'
  | 'TWITTER'
  | 'REDDIT';

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
