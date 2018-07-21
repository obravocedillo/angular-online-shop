import { TestBed, inject } from '@angular/core/testing';

import { ObjetosCarritoService } from './objetos-carrito.service';

describe('ObjetosCarritoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjetosCarritoService]
    });
  });

  it('should be created', inject([ObjetosCarritoService], (service: ObjetosCarritoService) => {
    expect(service).toBeTruthy();
  }));
});
