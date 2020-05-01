import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getUrl(query: string) {
    const url: string = 'https://login-app-a854e.firebaseio.com';
    return `${url}${query}.json`;
  }

  save(heroe: HeroeModel) {
    return this.http.post(this.getUrl('/heroes'), heroe).pipe(
      map((element: any) => {
        // Save id into hero and return it
        heroe.id = element.name;
        console.log(heroe);
        return heroe;
      })
    );
  }

  update(heroe: HeroeModel) {
    //Copy hero and delete id before update it.
    const newHero = { ...heroe };
    delete newHero.id;
    return this.http.put(this.getUrl(`/heroes/${heroe.id}`), newHero);
  }

  getAll() {
    return this.http
      .get(this.getUrl('/heroes'))
      .pipe(map((resp) => this.transformHeroData(resp)));
  }

  private transformHeroData(heroesObj) {
    let heroArray: HeroeModel[] = [];
    // get an array with the object keys
    Object.keys(heroesObj).forEach((key) => {
      let hero: HeroeModel = heroesObj[key];
      hero.id = key;
      heroArray.push(hero);
    });
    return heroArray;
  }
}
