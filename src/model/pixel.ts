export interface Position {
    row: number,
    col: number
}

export interface Pixel {
    position: Position,
    brightness: number;
    color: string;
}

export const EMPTY_PIXEL: Pixel = {
    position: { row: -1, col: -1 },
    brightness: 100,
    color: '#000000'
}