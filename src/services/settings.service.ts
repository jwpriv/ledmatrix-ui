import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EMPTY_PIXEL, Pixel, Position } from 'src/model/pixel';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public matrix: Map<Position, Pixel>;
  public colors: { [id: string]: string }
  public currentColor: string;

  private _pixelChangedSource: BehaviorSubject<Pixel>;
  public pixelChanged$: Observable<Pixel>;

  constructor() {
    this.matrix = new Map<Position, Pixel>();
    this.colors = { "default": '#ff0000' };
    this.currentColor = this.colors["default"];

    this._pixelChangedSource = new BehaviorSubject<Pixel>( { ...EMPTY_PIXEL });
    this.pixelChanged$ = this._pixelChangedSource.asObservable();
  }

  public setPixel(pos: Position, pxl: Pixel) {
    this.matrix.set(pos, pxl);
    this._pixelChangedSource.next(pxl);
  }

  public getPixel(pos: Position): Pixel | undefined {
    return this.matrix.get(pos);
  }

  public clear() {
    this.matrix.forEach( (pxl, pos) => { this.setPixel(pos, { ...pxl, color: '#000000' })});
  }
}
