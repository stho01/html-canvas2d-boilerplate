import { Vector2D } from "../math/vector2d";

export class Circle {
    private _pos: Vector2D;
    private _r: number;

    constructor(x: number, y: number, r: number) {
        this._pos = new Vector2D(x, y); 
        this._r = r;
    }

    get x() { return this._pos.x; }
    get y() { return this._pos.y; }
    get r() { return this._r; }
    get pos(): Vector2D { return this._pos; }
 
    set r(value: number) { 
        this._r = value;
    }
    set pos(vec: Vector2D) {
        this._pos = vec;
    }
}