import fetch from 'node-fetch';

class Weather
{
    lat: number;
    lon: number;

    constructor()
    {
        this.lat = 41.391034;
        this.lon = 2.193932;
    }

    private get = (lat: number, lon: number) => {
        const url = 'http://www.7timer.info/bin/api.pl?lon=' + lon + '&lat=' + lat + '&product=astro&output=json';

        return fetch(url)
        .then(html => html.json())
        .catch(error => console.log(error));
    };


    /*
    **  Return array:
    **
    **  [
    **      {
    **          weather,
    **          temp
    **      },
    **      ...
    **  ]
    */
    public get_weather = () => {
        return this.get(this.lat, this.lon).then(js => {
            let next_weather = [];
            
            js['dataseries'].forEach(element => {
                let buffer = {'weather': '', 'temp': 0};

                if (element['prec_type'] == 'none') {
                    if (element['cloudcover'] < 3) {
                        buffer['weather'] = 'clear';
                    } else if (element['cloudcover'] < 8) {
                        buffer['weather'] = 'partly_cloudy';
                    } else {
                        buffer['weather'] = 'cloudy';
                    }
                } else if (element['lifted_index'] < -4) {
                    if (element['prec_type'] == 'rain') {
                        buffer['weather'] = 'thunderstorm_rain';
                    } else {
                        buffer['weather'] = 'thunderstorm';
                    }
                } else if (element['prec_type'] == 'rain') {
                    buffer['weather'] = 'rain';
                } else if (element['prec_type'] == 'snow') {
                    buffer['weather'] = 'snow';
                }
                buffer['temp'] = element['temp2m'];
                next_weather.push(buffer);
            });
            return next_weather;
        });
    };
}

export default Weather;