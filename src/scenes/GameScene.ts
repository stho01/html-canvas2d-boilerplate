import { IState } from "./../state/State";
import { Game } from "./../Game";
import { Canvas2DRenderer } from "./../Canvas2DRenderer";
import { Vector2D } from "./../math/Vector2D";
import { Point } from "./../math/Point";
import { Circle } from "./../geometry/Circle";

export class GameScene implements IState<Game> {
    "use strict";
    
    private _pos: Vector2D; 
    
    init(game: Game): void {
        console.log("Game scene initialized");
    }

    resume(entity: Game): void {
        // Resume is called when this state is pushed on top of the state stack. 
    }

    pause(entity: Game): void {
        // Pause is called if the current state is changed 
    }

    dispose(ebtity: Game): void {
        // Dispose scene is called if the state is being removed from the history stack.
    }
    
    update(dt: number, game: Game) {
        let mp: Point = game.input.getMousePosition();
        this._pos = new Vector2D(mp.x,mp.y);
    }
    
    render(dt: number, game: Game) {
        game.renderer.renderText("stho's html canvas boilerplate", this._pos);
        
    }
} 