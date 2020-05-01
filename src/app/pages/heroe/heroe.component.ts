import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel;
  constructor(
    private _heroeService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.heroe = new HeroeModel();
    // get id param from url
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      // Get hero by id
      this._heroeService.getById(id).subscribe((hero: HeroeModel) => {
        this.heroe = hero;
        this.heroe.id = id;
      });
    }
  }

  guardar(heroeForm: NgForm) {
    if (heroeForm.invalid) {
      return;
    }

    // Saving data feedback
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // Create a observable to manage the post and put request
    let observable: Observable<any>;

    if (this.heroe.id) {
      // Update hero
      observable = this._heroeService.update(this.heroe);
    } else {
      // Create hero
      observable = this._heroeService.save(this.heroe);
    }

    observable.subscribe((heroe) =>
      // Show message when the request is resolved.
      Swal.fire({
        title: heroe.nombre,
        text: 'Se operacion se realizó exitosamente',
        icon: 'success',
      })
    );
  }
}
