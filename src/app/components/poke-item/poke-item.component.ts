import { ShareSelectedPokemonService } from './../../services/share-selected-pokemon.service';
import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-poke-item',
  templateUrl: './poke-item.component.html',
  styleUrls: ['./poke-item.component.css'],
})
export class PokeItemComponent implements OnInit {
  @Input() pokemon?: Pokemon;
  i?: string;
  imagePath?: string;

  constructor(private shareSelected: ShareSelectedPokemonService) {}

  ngOnInit(): void {
    this.getIndex();
  }

  getIndex(): void {
    if (this.pokemon) {
      const url: string = this.pokemon?.url!;
      const spliceUrl = url.split('/');
      this.i = spliceUrl[spliceUrl.length - 2];
      this.imagePath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.i}.png`;
    }
  }

  selectPokemon(pokemon: Pokemon) {
    this.shareSelected.chooseSelectedPokemon(pokemon);
  }
}
