/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WeatherRequestService } from './weather-request.service';

describe('WeatherRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherRequestService]
    });
  });

  it('should ...', inject([WeatherRequestService], (service: WeatherRequestService) => {
    expect(service).toBeTruthy();
  }));
});
