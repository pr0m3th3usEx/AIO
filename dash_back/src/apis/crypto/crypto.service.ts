import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'express';
import { COINAPI_KEY } from 'src/config';

type ExchangeRate = {
  time: Date;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
};

@Injectable()
export class CryptoService {
  private readonly instance = axios.create({
    baseURL: `http://rest${
      process.env.NODE_ENV === 'development' ? '-sandbox' : ''
    }.coinapi.io/v1`,
    headers: {
      'X-CoinAPI-Key': COINAPI_KEY,
    },
  });

  async getExchangeRate(from: string, target = 'USD'): Promise<ExchangeRate> {
    return this.instance
      .get(`/exchangerate/${from}/${target}`)
      .then((response) => response.data);
  }
}
