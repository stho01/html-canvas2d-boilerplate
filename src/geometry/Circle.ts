"use strict";

import { Vector2D } from "../math/vector2d";

export class Circle {

    //********************************************
    //** attributes:
    //********************************************
    
    private _pos : Vector2D;
    private _r   : number;

    //********************************************
    //** ctor:
    //********************************************

    constructor(x: number, y: number, r: number) {
        this._pos = new Vector2D(x, y); 
        this._r = r;
    }
    
    //********************************************
    //** getters:
    //********************************************
    
    get x() { return this._pos.x; }
    get y() { return this._pos.y; }
    get r() { return this._r; }
    get pos(): Vector2D { return this._pos; }
}