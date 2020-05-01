import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[];

  constructor(private _heroesService: HeroesService) {}

  ngOnInit(): void {
    this._heroesService.getAll().subscribe((heros: any) => {
      this.heroes = heros;
    });
  }
}
