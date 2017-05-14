import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subscription } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ComponentInteractionService} from './component-interaction.service';

@Injectable()
export class WeatherRequestService {

  weatherUrl: string = 'http://api.openweathermap.org/data/2.5/weather';
  appId: string = '9f2aaed5d606619e96fcbeb042c6c0cb';
  queryCity: string;
  units: string = 'metric';

  constructor(
  	private http: Http,
  	private dataService: ComponentInteractionService
  ) {
    this.dataService.selectedCity.subscribe((city: string) => {
      this.queryCity = city;
    });
    this.dataService.selectedUnits.subscribe((unit: string) => {
      console.log(unit);
      this.units = unit;
    });
  }

  search (city?: string) {
  let params: URLSearchParams = new URLSearchParams();
 	params.set('APPID', this.appId);
 	params.set('q', city ? city : this.queryCity);
  params.set('units', this.units);
 
  return this.http.get(this.weatherUrl, {search: params})
       .map((res:Response) => res.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
