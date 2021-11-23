import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FRONT_END_URL, REDDIT_APP_ID, REDDIT_APP_SECRET } from 'src/config';
import { AuthorizationTokens } from 'src/services/services.dto';
import axios from 'axios';
import qs from 'qs';

export type RedditAccessToken = {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
  scope: string;
};

@Injectable()
export class RedditService {
  private OAUTH_URL = 'https://www.reddit.com/api/v1/authorize';
  private STATE = 'random';
  private instance = axios.create({
    baseURL: 'https://www.reddit.com/api',
  });

  getAuthorizationUrl(): string {
    return `${this.OAUTH_URL}?client_id=${REDDIT_APP_ID}&response_type=code&state=random&redirect_uri=${FRONT_END_URL}/oauth_callback&duration=permanent&scope=read`;
  }

  async getTokens(query: URLSearchParams): Promise<AuthorizationTokens> {
    if (query.get('state') !== this.STATE) {
      throw new BadRequestException('Invalid response from Reddit');
    }

    try {
      const res = await this.instance.post<RedditAccessToken>(
        '/v1/access_token',
        qs.stringify({
          grant_type: 'authorization_code',
          code: query.get('code'),
          redirect_uri: `${FRONT_END_URL}/oauth_callback`,
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: REDDIT_APP_ID,
            password: REDDIT_APP_SECRET,
          },
        },
      );
      console.log(res.data);
      return {
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      };
    } catch (err) {
      throw new UnauthorizedException("Couldn't receive tokens from Reddit");
    }
  }
}
