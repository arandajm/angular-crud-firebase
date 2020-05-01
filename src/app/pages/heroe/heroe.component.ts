import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel;
  constructor(private _heroeService: HeroesService) {}

  ngOnInit(): void {
    this.heroe = new HeroeModel();
  }

  guardar(heroeForm: NgForm) {
    if (heroeForm.invalid) {
      return;
    }
    if (this.heroe.id) {
      // Update hero
      this._heroeService.update(this.heroe).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err)
      );
    } else {
      // Create hero
      this._heroeService.save(this.heroe).subscribe(
        (heroe) => (this.heroe = heroe),
        (err) => console.log(err)
      );
    }
  }
}
