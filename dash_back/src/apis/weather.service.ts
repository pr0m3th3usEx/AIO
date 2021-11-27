import { Injectable } from '@nestjs/common';
import { WEATHER_API_KEY } from 'src/config';
import fetch from 'node-fetch';

@Injectable()
export class WeatherService {
  current = async (city: string) => {
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
            temp: (content.main.temp - 273.15).toFixed(2),
          },
        ];
      })
      .catch((error) => {
        console.log(error);
      });
  };

  futur = async (city: string, days: number = 7) => {
    return await fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
        city +
        '&appid=' +
        WEATHER_API_KEY,
    )
      .then((info) => {
        return info.json();
      })
      .then((content) => {
        let weather = [];
        content.list.forEach((element) => {
          if (element.dt_txt.endsWith('12:00:00')) {
            weather.push({
              weat: element.weather[0].main,
              temp: (element.main.temp - 273.15).toFixed(2),
            });
          }
        });
        return weather;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

/*
const w = new Weather();
w.current("paris").then(r => console.log(r));
*/
