import { TestBed } from '@angular/core/testing';

import { ShareSelectedPokemonService } from './share-selected-pokemon.service';

describe('ShareSelectedPokemonService', () => {
  let service: ShareSelectedPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareSelectedPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
