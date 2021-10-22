import { ShareSelectedPokemonService } from './../../services/share-selected-pokemon.service';
import { PokeapiService } from './../../services/pokeapi.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Pokemon, PokemonDetails } from 'src/app/models/Pokemon';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  searchable$!: Observable<PokemonDetails>;
  private searchTerms: Subject<string> = new Subject<string>();
  subscription?: Subscription;
  selPoke$: Observable<Pokemon | undefined>;

  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(
    private readonly pokeApiService: PokeapiService,
    private shareSelected: ShareSelectedPokemonService
  ) {
    this.searchable$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.pokeApiService.searchPokemons(term))
    );
    this.selPoke$ = this.shareSelected.pokemon$;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
