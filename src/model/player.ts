export class Player {

  name: string;
  lang: string;

  constructor({name: name, lang: lang= 'en'}) {
    this.name = name;
    this.lang = lang;
  }
}
