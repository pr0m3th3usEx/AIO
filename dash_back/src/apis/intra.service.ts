import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class IntraService {
  home = async (autologin: string) => {
    return await fetch(autologin + '/?format=json').then((j) => {
      return j.json();
    });
  };

  user = async (autologin: string) => {
    return await fetch(autologin + '/user/?format=json').then((j) => {
      return j.json();
    });
  };

  list_module = async (autologin: string) => {
    return await fetch(
      autologin + '/module/board/?format=json&start=2021-01-01&end=2022-12-31',
    ).then((j) => {
      return j.json().then((element) => {
        let modules = [];
        element.forEach((element) => {
          modules.push(element.codemodule);
        });
        return modules;
      });
    });
  };

  module = async (module: string, autologin: string) => {
    return await fetch(
      autologin + '/module/2021/' + module + '/BAR-5-1/?format=json',
    ).then((j) => {
      return j.json();
    });
  };
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
