import { Component, Input, OnInit } from '@angular/core';
import { filter, shareReplay, Subscription } from 'rxjs';
import { EMPTY_PIXEL, Pixel } from 'src/model/pixel';
import { CommunicationService } from 'src/services/communication.service';
import { SettingsService } from 'src/services/settings.service';

@Component({
  selector: 'app-pixel',
  templateUrl: './pixel.component.html',
  styleUrls: ['./pixel.component.scss']
})
export class PixelComponent implements OnInit {

  @Input()
  row: number = -1;

  @Input()
  col: number = -1;

  pixel: Pixel = {
    ...EMPTY_PIXEL
  };

  pixelChangeSubscription: Subscription | undefined;

  constructor(private settings: SettingsService, private communication: CommunicationService) {
  }

  ngOnInit(): void {
    this.pixel.position = { row: this.row, col: this.col };
    this.settings.setPixel(this.pixel.position, this.pixel);

    //When a pixel is changed using the SettingsService, the changed Pixel is pushed to the pixelChanged observable
    this.pixelChangeSubscription = this.settings.pixelChanged$.pipe(filter(pxl => pxl.position.row === this.pixel.position.row && pxl.position.col === this.pixel.position.col)).subscribe(pxl => {
      if (this.pixel.color != pxl.color || this.pixel.brightness != pxl.brightness) {
        this.pixel = { ...pxl };
      }

    });
  }

  handleMouseEvent(event: MouseEvent) {

    if (event.buttons === 1) {
      this.pixel = { ...this.pixel, color: this.settings.currentColor }
      this.setPixel();
    }
    event.preventDefault();
  }

  handleTouch(event: TouchEvent) {
    this.setPixel();

    event.preventDefault();
  }

  handleContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  setPixel() {
    this.settings.setPixel(this.pixel.position, { ...this.pixel });
    this.communication.setPixel({ ...this.pixel }).subscribe();
  }
}
