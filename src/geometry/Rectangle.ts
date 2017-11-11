import { Vector2D } from './../math/Vector2D';

export class Rectangle {
    "use strict";

    //********************************************
    //** attributes:
    //********************************************
    
    private _pos    : Vector2D;
    private _width  : number;
    private _height : number;

    //********************************************
    //** ctor:
    //********************************************
    
    constructor(x: number, y: number, width: number, height: number) {
        this._pos     = new Vector2D(x, y);
        this._width   = width;
        this._height  = height;
    }
    
    //********************************************
    //** getters:
    //********************************************

    get position()  : Vector2D { return this._pos; }
    get x()         : number   { return this._pos.x; }
    get y()         : number   { return this._pos.y; }
    get width()     : number   { return this._width; }
    get heigth()    : number   { return this._height; }
}