/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComponentInteractionService } from './component-interaction.service';

describe('ComponentInteractionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentInteractionService]
    });
  });

  it('should ...', inject([ComponentInteractionService], (service: ComponentInteractionService) => {
    expect(service).toBeTruthy();
  }));
});
