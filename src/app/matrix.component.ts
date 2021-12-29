import { Component, Input, OnInit } from '@angular/core';
import { EMPTY_PIXEL, Pixel, Position } from 'src/model/pixel';
import { CommunicationService } from 'src/services/communication.service';
import { SettingsService } from 'src/services/settings.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  @Input()
  columnCount: number = 0;

  @Input()
  rowCount: number = 0;

  constructor(public communication: CommunicationService, public settings: SettingsService) {
  }

  ngOnInit(): void {
  }

  counter(i: number) {
    return new Array(i);
  }

  clearMatrix() {
    this.communication.clear().subscribe(() => this.settings.clear());
  }

  saveMatrix() {
    let pixels = Array<Pixel>();

    this.settings.matrix.forEach(itm => pixels.push(itm));
    const ret = new Blob([JSON.stringify(pixels)]);

    saveAs(ret, 'newmatrix.json');

  }

  loadMatrix() {

  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        const stringRes = fileReader.result as string;
        const pixels = JSON.parse(stringRes) as Array<Pixel>;

        this.settings.matrix = new Map<Position, Pixel>();
        pixels.forEach(pxl => {
          this.settings.setPixel(pxl.position, pxl);
          if (pxl.color !== EMPTY_PIXEL.color) {
            this.communication.setPixel(pxl).subscribe();
          }
        }
        );
      }
      fileReader.readAsText(file);

    }
  }
}

