import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Pokemon, PokemonDetails } from 'src/app/models/Pokemon';
import { PokeapiService } from './../../services/pokeapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  pokemonName?: string;
  nextPage: string = '';
  prevPage: string = '';
  pokemonList: Pokemon[] = [];

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.pokeapiService.getPokemons().subscribe((data) => {
      this.pokemonList = data.results!;
      this.nextPage = data.next!;
      if (data.previous) {
        this.prevPage = data.previous;
      }
    });
  }

  goNextPage(): void {
    this.pokeapiService.getPokemons(this.nextPage).subscribe((data) => {
      this.pokemonList = data.results!;
      this.nextPage = data.next!;
      if (data.previous) {
        this.prevPage = data.previous;
      }
    });
  }

  goPrevPage(): void {
    this.pokeapiService.getPokemons(this.prevPage).subscribe((data) => {
      this.pokemonList = data.results!;
      this.nextPage = data.next!;
      if (data.previous) {
        this.prevPage = data.previous;
      }
    });
  }
}
