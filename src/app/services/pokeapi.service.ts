import { MessageService } from './message.service';
import { Pokemon } from 'src/app/models/Pokemon';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
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

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getPokemons(
    link: string = `${this.apiUrl}/pokemon?limit=10`
  ): Observable<PokemonApiResult> {
    return this.http.get<PokemonApiResult>(link, httpOptions).pipe(
      tap((_) => {
        console.log('Successfuly fetched pokemons!');
      }),
      catchError(this.handleError<PokemonApiResult>('getPokemons', {}))
    );
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiUrl}/pokemon/${name}`).pipe(
      tap((_) => {
        console.log('Successfuly fetched specified pokemon details!');
      }),
      catchError(this.handleError<PokemonDetails>('getPokemons', {}))
    );
  }

  searchPokemons(term: string): Observable<Pokemon> {
    console.log(term);
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of({ name: '', url: '' });
    }

    return this.http
      .get<Pokemon>(`${this.apiUrl}/pokemon/${term}`, httpOptions)
      .pipe(
        tap((_) => {
          console.log('Debounce');
        }),
        catchError(this.handleError<Pokemon>('getPokemons', {}))
      );
  }

  private log(msg: string) {
    this.messageService.add(`PokeApiService: ${msg}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
