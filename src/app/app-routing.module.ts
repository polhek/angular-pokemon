import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'pokemons', component: PokemonsComponent },
  { path: 'pokemon/:name', component: PokemonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
