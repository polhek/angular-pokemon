import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetails?: PokemonDetails;
  imagePath?: string;

  constructor(
    private pokeapiService: PokeapiService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const nameParams = this.route.snapshot.params.name;
    this.pokeapiService.getPokemonDetails(nameParams).subscribe((pokemon) => {
      this.imagePath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
      this.pokemonDetails = pokemon;
      console.log(pokemon);
    });
  }
}
