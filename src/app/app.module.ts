import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrixComponent } from './matrix.component';
import { MainPageComponent } from './main-page.component';
import { PixelComponent } from './pixel.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorSettingsComponent } from './color-settings/color-settings.component';
import { HttpClientModule } from '@angular/common/http';
import * as Hammer from 'hammerjs';

// making hammer config (3)
export class MyHammerConfig extends HammerGestureConfig {
  override = <any>{
  pan: { direction: Hammer.DIRECTION_ALL },
  }};

@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    MainPageComponent,
    PixelComponent,
    ColorSettingsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    ColorPickerModule,
    HttpClientModule
  ],
  providers: [
  { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
