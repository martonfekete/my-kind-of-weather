import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { WeatherInputComponent } from './weather-input/weather-input.component';
import { WeatherOutputComponent } from './weather-output/weather-output.component';

import { ComponentInteractionService } from './component-interaction.service';
import { WeatherRequestService } from './weather-request.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherInputComponent,
    WeatherOutputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ComponentInteractionService,
    WeatherRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
