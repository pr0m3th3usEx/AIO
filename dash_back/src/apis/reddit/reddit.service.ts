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

export type RedditOAuthError = {
  error: string;
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
  author: string;
  subreddit: string;
  title: string;
  url: string;
  media: any;
  score: number;
  likes: number;
  clicked: boolean;
  thumbnail: string;
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
      const res = await this.instance.post<
        RedditAccessToken | RedditOAuthError
      >(
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
      if ('error' in res.data) {
        throw new BadRequestException("Couldn't grant token from Reddit");
      }
      return {
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      };
    } catch (err) {
      throw err;
    }
    return {
      access_token: '',
      refresh_token: '',
    };
  }

  async getNewSubredditPosts(
    sr: string,
    access_token: string,
  ): Promise<Thing<List<Post>>> {
    return this.instance
      .get(`r/${sr}/new`, {
        data: {
          after: null,
          before: null,
          limit: 25,
          count: null,
        },
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      })
      .then((response) => response.data);
  }
}
