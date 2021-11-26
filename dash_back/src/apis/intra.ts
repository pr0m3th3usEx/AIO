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
}