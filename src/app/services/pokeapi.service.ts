import { Pokemon } from 'src/app/models/Pokemon';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PokemonApiResult, PokemonDetails } from './../models/Pokemon';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  private apiUrl =
    'https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemons(
    link: string = `${this.apiUrl}/pokemon?limit=10`
  ): Observable<PokemonApiResult> {
    return this.http.get<PokemonApiResult>(link, httpOptions).pipe(
      tap((_) => {
        console.log('Successfuly fetched pokemons!');
      })
    );
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiUrl}/pokemon/${name}`).pipe(
      tap((_) => {
        console.log('Successfuly fetched specified pokemon details!');
      })
    );
  }

  searchPokemons(term: string): Observable<Pokemon> {
    console.log(term);
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of({ name: '', url: '' });
    }
    console.log('runal');
    return this.http
      .get<Pokemon>(`${this.apiUrl}/pokemon/${term}`, httpOptions)
      .pipe(
        tap((_) => {
          console.log('Debounce');
        })
      );
  }
}
