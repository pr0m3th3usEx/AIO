import { Injectable } from '@nestjs/common';
import { WEATHER_API_KEY } from 'src/config';
import fetch from 'node-fetch';

export type Weather = {
  dt: number;
  weat: string;
  temp: number;
};

export type WeatherData = {
  city: string;
  weathers: Weather[];
};

@Injectable()
export class WeatherService {
  current = async (city: string): Promise<Weather> => {
    return await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=' +
        WEATHER_API_KEY,
    )
      .then((info) => {
        return info.json();
      })
      .then((content) => {
        return [
          {
            weat: content.weather[0].main,
            temp: parseFloat((content.main.temp - 273.15).toFixed(2)),
          },
        ];
      })
      .catch((error) => {
        console.log(error);
      });
  };

  futur = async (city: string, days = 7): Promise<WeatherData> => {
    if (days < 0 || days > 16) {
      throw Error('Invalid days number');
    }
    return await fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
        city +
        '&cnt=' +
        days +
        '&appid=' +
        WEATHER_API_KEY,
    )
      .then((info) => {
        return info.json();
      })
      .then((content) => {
        return {
          city: content.city.name,
          weather: content.list.map((element) => ({
            dt: element.dt,
            weat: element.weather[0].main,
            temp: parseFloat((element.main.temp - 273.15).toFixed(2)),
          })),
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

/*
const w = new WeatherService();
w.futur("paris", 16).then(r => console.log(r));
*/
