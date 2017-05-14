import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

export interface WeatherParams {
	// minvals
	humidMin?: number;
	pressMin?: number;
	tempMin?: number;
	windMin?: number;
	// maxvals
	humidMax?: number;
	pressMax?: number;
	tempMax?: number;
	windMax?: number;
	// operators
	humidOp?: string;
	pressOp?: string;
	tempOp?: string;
	windOp?: string;
}

@Injectable()
export class ComponentInteractionService {
  selectedCity: ReplaySubject<string> = new ReplaySubject<string>(1);
  selectedUnits: ReplaySubject<string> = new ReplaySubject<string>(1);
  evaluation: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  weatherParams: ReplaySubject<any> = new ReplaySubject<any>(1);
  operators: any = [];
  units: any = [];
  weatherCache: any;

  constructor() {
  	this.selectedCity.next("Budapest");
  	this.setupOperators();
    this.setupUnits();

    this.weatherParams.subscribe((params: any) => {
      let verdict = this.evalWeather(params, this.weatherCache);
      this.evaluation.next(verdict);
    });
  }

  setupOperators() {
  	this.operators = [
      { label: 'not important', val: 'nan' },
  		{ label: 'is between', val: 'between' },
  		{ label: 'is less than', val: 'less' },
  		{ label: 'is more than', val: 'more' },
  		{ label: 'is exactly', val: 'exact' }	
  	];
  }

  setupUnits() {
    this.units = [
      { label: 'Standard', val: 'standard' },
      { label: 'Metric', val: 'metric' },
      { label: 'Imperial', val: 'imperial' },
    ];

    this.selectedUnits.next('metric');
  }

  evalWeather(params: WeatherParams, data: any): boolean {
    let humOk = this._evalWeatherData('humidity', params, data);
    let pressOk = this._evalWeatherData('pressure', params, data);
    let tempOk = this._evalWeatherData('temp', params, data);
    let windOk = this._evalWeatherData('wind', params, data);

    return humOk && pressOk && tempOk && windOk;
  }

  private _evalWeatherData(check: string, params: WeatherParams, data: any): boolean {
    let verdict: boolean = false;
    let checked = check === 'wind' ? data.wind.speed : data.main[check];
    let checkOp = this._getCheckedOperator(check);
    let paramVal = checkOp.slice(0,-2) + 'Min';
    let paramMax = checkOp.slice(0,-2) + 'Max';

    if (!params[paramVal] || params[paramVal] === 'nan') {
      // if user defined no such parameter
      verdict = true;
    } else {
      // if we have defined parameters
      switch (params[checkOp]) {
        case "between":
          verdict =  checked >= params[paramVal] && checked <= params[paramMax];
          break;
        case "less":
          verdict = checked < params[paramVal];
          break;
        case "more":
          verdict = checked > params[paramVal];
          break;
        case "exact":
          verdict = checked === params[paramVal];
          break;
        default:
          verdict = false;
          break;
      }
    }

    return verdict;
  }

  private _getCheckedOperator(check: string): string {
    let checked: string;
    switch (check) {
      case "humidity":
        checked =  'humidOp';
        break;
      case "pressure":
        checked = 'pressOp';
        break;
      case "temp":
        checked = 'tempOp';
        break;
      default:
        checked = 'windOp';
        break;
    }
    return checked;
  }

}
