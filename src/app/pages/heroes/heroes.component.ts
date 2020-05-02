import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[];
  loading = false;

  constructor(private _heroesService: HeroesService) {}

  ngOnInit(): void {
    this.loading = true;
    this._heroesService.getAll().subscribe((heros: any) => {
      this.loading = false;
      this.heroes = heros;
    });
  }

  delete(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: 'Confirmación',
      text: `Esta seguro que desea borrar al heroe ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    })
      // Return a promise
      .then((resp) => {
        if (resp.value) {
          this._heroesService.delete(heroe.id).subscribe((id) => {
            this.heroes.splice(index, 1);
          });
        }
      });
  }
}
