import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

export type UserInfos = {
  email: string;
  firstname: string;
  lastname: string;
  picture: string;
  year: string;
  promo: number;
  location: string;
  credits: number;
  gpa: number;
};

export type ModuleListInfos = {
  code: string;
  title: string;
};

export type Activity = {
  begin: string;
  end: string;
  title: string;
  registered: boolean;
};

export type ModuleInfo = {
  title: string;
  begin: string;
  end: string;
  credits: string;
  description: string;
  competences: string;
  grade: string;
  activities: Activity[];
};

@Injectable()
export class IntraService {
  home = async (autologin: string) => {
    return await fetch(autologin + '/?format=json').then((j) => {
      return j.json();
    });
  };

  user = async (autologin: string): Promise<UserInfos> => {
    return await fetch(autologin + '/user/?format=json').then((j) => {
      return j.json().then((infosuser) => {
        return {
          email: infosuser['login'],
          firstname: infosuser['firstname'],
          lastname: infosuser['lastname'],
          picture: autologin + infosuser['picture'],
          year: infosuser['scolaryear'],
          promo: infosuser['promo'],
          location: infosuser['location'],
          credits: infosuser['credits'],
          gpa: infosuser['gpa'][0]['gpa'],
        };
      });
    });
  };

  listModule = async (autologin: string): Promise<ModuleListInfos[]> => {
    return await fetch(
      autologin + '/module/board/?format=json&start=2021-01-01&end=2022-12-31',
    ).then((j) => {
      return j.json().then((element) => {
        const modules = element.map((e) => ({
          code: e['codemodule'],
          title: e['title_module'],
        }));
        return modules.filter(
          ({ code }, index) =>
            !modules.map((o) => o.code).includes(code, index + 1),
        );
      });
    });
  };

  module = async (module: string, autologin: string): Promise<ModuleInfo> => {
    return await fetch(
      autologin + '/module/2021/' + module + '/BAR-5-1/?format=json',
    ).then((j) => {
      return j.json().then((element: any) => {
        return {
          title: element['title'],
          begin: element['begin'],
          end: element['end'],
          credits: element['credits'],
          description: element['description'],
          competences: element['competence'],
          grade: element['student_grade'],
          activities: element['activites'].map((activity) => ({
            begin: activity['start'],
            end: activity['end'],
            title: activity['title'],
            registered: activity['register'] === '1' ? true : false,
          })),
        };
      });
    });
  };
}

/*
const i = new IntraService();
i.list_module("https://intra.epitech.eu/auth-1e03af3cf61e6c5296b5482ca7f712c3e0d97409").then(j => {
  console.log(j);
}).catch(e => {
  console.log(e);
});
*/
