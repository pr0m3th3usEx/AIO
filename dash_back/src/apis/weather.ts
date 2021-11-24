const fetch = require("node-fetch");

export class Weather
{
    current = async (city: string) => {
        await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.#API_KEY).then(info => {
            return info.json();
        }).then(content => {
            return {
                weat: content.weather[0].main,
                temp: (content.main.temp - 273.15).toFixed(2)
            };
        }).catch(error => {
            console.log(error);
        });
    }
}