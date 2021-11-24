const fetch = require("node-fetch");

export class Weather
{
    #API_KEY = "53a136d489a2b9b853526d68e0f642ab";

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

    futur = async (city: string, days: number = 7) => {
        await fetch("https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=metric&cnt=" + days + "&appid=" + this.#API_KEY).then(info => {
            return info.json();
        }).then(content => {
            console.log(content);
        }).catch(error => {
            console.log(error);
        });
    }
}