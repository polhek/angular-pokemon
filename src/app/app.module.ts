import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { PokeItemComponent } from './components/poke-item/poke-item.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { RevertStringPipe } from './pipes/revert-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    PokemonsComponent,
    PokeItemComponent,
    PokemonDetailComponent,
    RevertStringPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
