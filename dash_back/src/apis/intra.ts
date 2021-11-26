const fetch = require("node-fetch");

export class Intra
{
    #autologin: string

    constructor(autologin: string) {
        this.#autologin = autologin
    }

    home = async () => {
        return await fetch(this.#autologin + "/?format=json").then(j => {
            return j.json();
        });
    }

    user = async () => {
        return await fetch(this.#autologin + "/user/?format=json").then(j => {
            return j.json();
        });
    }

    module = async (module: string) => {
        return await fetch(this.#autologin + "/module/2021/" + module + "/BAR-5-1/?format=json").then(j => {
            return j.json();
        });
    }
}