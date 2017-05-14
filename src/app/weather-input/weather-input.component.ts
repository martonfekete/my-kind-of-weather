import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherRequestService } from '../weather-request.service';
import { ComponentInteractionService, WeatherParams } from '../component-interaction.service';

@Component({
  selector: 'app-weather-input',
  templateUrl: './weather-input.component.html',
  styleUrls: ['./weather-input.component.css']
})
export class WeatherInputComponent implements OnInit {
  city: string;
  params: WeatherParams = {};
  weatherData: any;
  verdict: boolean = false;
  operators: any[];
  units: any[];
  tempUnit: string;
  outputInitiated: boolean = false;

  @Output() isNiceUpdate = new EventEmitter();

  constructor(
  	private weather: WeatherRequestService,
  	private dataService: ComponentInteractionService
  ) {
  	this.dataService.selectedCity.subscribe((city: string) => {
  		this.city = city;
  		this.getWeatherData(city);
  	});
  	this.operators = this.dataService.operators;
  	this.units = this.dataService.units;
  	this.tempUnit = 'metric';
  	this.params.humidOp = 'nan';
  	this.params.pressOp = 'nan';
  	this.params.tempOp = 'nan';
  	this.params.windOp = 'nan';
  }

  ngOnInit() {}

  cityChanges() {
  	this.getWeatherData(this.city);
  }

  unitUpdated(event: any) {
  	this.tempUnit = event;
  	this.dataService.selectedUnits.next(this.tempUnit);
  }

  getWeatherData(city: string) {
  	this.weather.search(city).subscribe((res) => {
  		this.weatherData = res;
  		this.dataService.weatherCache = res;
  	});
  }

  paramsChanged() {
  	if (this.outputInitiated) {
  		this.dataService.weatherParams.next(this.params);
  	}
  }

  isGood() {
  	this.outputInitiated = true;
  	this.verdict = this.dataService.evalWeather(this.params, this.weatherData);
  	this.dataService.evaluation.next(this.verdict);
	  this.dataService.selectedCity.next(this.city);
  	this.isNiceUpdate.emit(true);
  }
}
