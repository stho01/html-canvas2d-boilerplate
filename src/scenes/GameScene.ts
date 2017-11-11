import { IState } from "../state/state";
import { Game } from "../game";
import { Canvas2DRenderer } from "../canvas2drenderer";
import { Vector2D } from "../math/vector2d";
import { Point } from "../math/point";
import { Circle } from "../geometry/circle";

export class GameScene implements IState<Game> {

    private _pos: Vector2D;

    init(game: Game): void {
        console.log("Game scene initialized");
    }
    
    update(dt: number, game: Game) {
        let mp: Point = game.input.getMousePosition();
        this._pos = new Vector2D(mp.x,mp.y);
    }

    render(dt: number, game: Game) {
        game.renderer.renderText("stho's html canvas boilerplate", this._pos);
    }
} 