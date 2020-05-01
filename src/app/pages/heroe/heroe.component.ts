import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel;
  constructor() {}

  ngOnInit(): void {
    this.heroe = new HeroeModel();
  }

  guardar(heroeForm: NgForm) {
    if (heroeForm.invalid) {
      return;
    }
    console.log(heroeForm.value);
  }
}
