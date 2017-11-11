"use strict";

import { Circle } from "./geometry/circle";
import { Line } from "./geometry/line";
import { Vector2D } from "./math/vector2d";

export class Canvas2DRenderer {

    private readonly _ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this._ctx = canvas.getContext("2d");
    }

    /**
     * 
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @param colorStyle 
     */
    public renderRect(x: number, y: number, w: number, h: number, colorStyle: string = "gray"): void {
        this._ctx.fillStyle = colorStyle;
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.fill();
    }

    /**
     * 
     * @param x 
     * @param y 
     * @param r 
     * @param colorStyle 
     */
    public renderCircle(c: Circle, colorStyle: string = "gray"): void {
        this._ctx.fillStyle = colorStyle;
        this._ctx.beginPath();
        this._ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        this._ctx.fill();
    }

    /**
     * 
     * @param l 
     */
    public renderLine(l: Line, color: string = "red"): void {
        this._ctx.strokeStyle = color;
        this._ctx.lineWidth = 2;
        this._ctx.beginPath();
        this._ctx.moveTo(l.p1.x, l.p1.y);
        this._ctx.lineTo(l.p2.x, l.p2.y);
        this._ctx.stroke();
    }

    /**
     * 
     * @param l 
     * @param color 
     */
    public renderDirLine(l: Line, color: string = "red"): void {
        this.renderLine(l);
        let c: Circle = new Circle(l.p2.x, l.p2.y, 10);
        this.renderCircle(c, color);
    }
    
    /**
     * 
     * @param l 
     * @param color 
     */
    public renderFatLine(l: Line, color: string = "red"): void {
        this._ctx.strokeStyle = color;
        this._ctx.lineWidth = 5;
        this._ctx.beginPath();
        this._ctx.moveTo(l.p1.x, l.p1.y);
        this._ctx.lineTo(l.p2.x, l.p2.y);
        this._ctx.stroke();    
    }

    /**
     * 
     * @param x 
     * @param y 
     * @param txt 
     */
    public renderText(txt: string, x: number|Vector2D, y?: number): void {
        this._ctx.fillStyle = "black";
        this._ctx.font = "30px Arial";

        if (typeof x === "number") {
            this._ctx.fillText(txt, x, y);
        } else {
            this._ctx.fillText(txt, x.x, x.y);
        }
    }
}