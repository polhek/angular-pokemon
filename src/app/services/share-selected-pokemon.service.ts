import { Pokemon } from 'src/app/models/Pokemon';
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareSelectedPokemonService {
  private readonly _selectedPokemon = new ReplaySubject<Pokemon | undefined>();
  public readonly pokemon$ = this._selectedPokemon.asObservable();

  chooseSelectedPokemon(pokemon: Pokemon): void {
    console.log(pokemon);
    this._selectedPokemon.next(pokemon);
  }

  constructor() {}
}
