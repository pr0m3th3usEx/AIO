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

    list_module = async () => {
        return await fetch(this.#autologin + "/module/board/?format=json&start=2021-01-01&end=2022-12-31").then(j => {
            
            return j.json().then(element => {
                let modules = [];
                element.forEach(element => {
                    modules.push(element.codemodule);
                });
                return modules;
            });
        });
    }

    module = async (module: string) => {
        return await fetch(this.#autologin + "/module/2021/" + module + "/BAR-5-1/?format=json").then(j => {
            return j.json();
        });
    }
}

/*
const i = new Intra("https://intra.epitech.eu/auth-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
i.list_module().then(j => {
    i.module(j[0]).then(j => {
        console.log(j);
    });
}).catch(e => {
    console.log(e);
});
*/