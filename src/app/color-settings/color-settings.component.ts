import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/services/settings.service';

@Component({
  selector: 'app-color-settings',
  templateUrl: './color-settings.component.html',
  styleUrls: ['./color-settings.component.scss']
})
export class ColorSettingsComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {
  }

  colorChanged(key: string, color: string) {
    this.settings.colors[key] = color;
  }

  identify(index: number, item: KeyValue<string, string>) {
    return item.key;
  }

  addColor() {
    this.settings.colors[`color${Object.keys(this.settings.colors).length + 1}`] = '#000000';
  }

  setColor(color: string) {
    this.settings.currentColor = color;
  }
}
