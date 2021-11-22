import { Widget } from './widget';

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
