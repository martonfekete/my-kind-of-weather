import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentInteractionService } from '../component-interaction.service';

@Component({
  selector: 'app-weather-output',
  templateUrl: './weather-output.component.html',
  styleUrls: ['./weather-output.component.css']
})
export class WeatherOutputComponent implements OnInit {
  @Input() outputInit: boolean = false;
  isNice: boolean;
  myCity: string;

  constructor(
  	private dataService: ComponentInteractionService
  ) {
  	this.dataService.evaluation.subscribe((val: boolean) => {
  		this.isNice = val;
  	});
  	this.dataService.selectedCity.subscribe((city: string) => {
  		this.myCity = city;
  	});
  }

  ngOnInit() {}
}
