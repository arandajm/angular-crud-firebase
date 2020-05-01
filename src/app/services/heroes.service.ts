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
    return `${url}/${query}.json`;
  }

  save(heroe: HeroeModel) {
    return this.http.post(this.getUrl('heroes'), heroe).pipe(
      map((element: any) => {
        // Save id into hero and return it
        heroe.id = element.name;
        console.log(heroe);
        return heroe;
      })
    );
  }
}
