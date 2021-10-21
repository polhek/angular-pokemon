import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/Pokemon';
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
  searchable$!: Observable<Pokemon>;
  private searchTerms = new Subject<string>();

  constructor(private pokeapiService: PokeapiService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchable$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.pokeapiService.searchPokemons(term))
    );

    this.pokeapiService.getPokemons().subscribe((data) => {
      console.log(data);
      this.pokemonList = data.results;
      this.nextPage = data.next;
      if (data.previous) {
        this.prevPage = data.previous;
      }
    });
  }
}
