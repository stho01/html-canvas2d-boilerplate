"use strict";

import { Canvas2DRenderer } from "./canvas2drenderer";
import { InputManager } from "./input/inputmanger";
import { IState } from "./state/state";
import { StateMachine } from "./state/StateMachine";
import { ViewPort } from "./types/ViewPort";
import { GameScene } from "./scenes/GameScene";

export interface GameOptions {
    clearColor?: string;
}

let _defaultOptions: GameOptions = {
    clearColor: "#000000"
}


export class Game {
    
    /**
     * Game intance. 
     */
    public static readonly Instance: Game = new Game();
    
    //****************************************x|****
    //** attributes
    //********************************************
    
    public  readonly _input         : InputManager;
    private readonly _canvas        : HTMLCanvasElement;
    private readonly _renderer      : Canvas2DRenderer;
    private readonly _sceneManager  : StateMachine<Game>;
    private _options                : GameOptions;
    private _previousDelta          : number = 0;
    private _viewPort               : ViewPort;
    
    //********************************************
    //** ctor:
    //********************************************
    
    private constructor() { 
        this._canvas        = document.getElementById("c") as HTMLCanvasElement;
        this._input         = new InputManager();
        this._renderer      = new Canvas2DRenderer(this._canvas);
        this._sceneManager  = new StateMachine(this);

        this._updateViewPort();
    }
    
    //********************************************
    //** getters:
    //********************************************
    
    get viewPort()      : ViewPort              { return this._viewPort; }
    get input()         : InputManager          { return this._input; }
    get renderer()      : Canvas2DRenderer      { return this._renderer; }
    get sceneManager()  : StateMachine<Game>    { return this._sceneManager; }
    
    //********************************************
    //**public:
    //********************************************
    
    /**
     * Initialize game variables and configs. 
     * @param options 
     */
    init(options?: GameOptions): Game {
        this._options = Object.assign({}, _defaultOptions, options);

        this._input.init();

        // set initial scene
        let initialScene: IState<Game> = new GameScene();
        this._sceneManager.push(initialScene);

        return this;
    }

    /**
     * Start game loop
     */
    run(): void {
        this._update(0);
    }

    //********************************************
    //**private:
    //********************************************
    
    /**
     * Updates the view port.
     */
    private _updateViewPort(): void {
        this._viewPort = {
            width:   Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height:  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        }

        this._canvas.width = this._viewPort.width;
        this._canvas.height = this._viewPort.height;
    }

    /**
     * Update and redraw game state. 
     * 
     * @param now 
     */
    private _update(now: number): void {
        let deltaTime: number = (now - this._previousDelta)/1000;
        this._previousDelta = now;
        
        this._updateViewPort();
        
        this._sceneManager.update(deltaTime);
     
        this._render(deltaTime);

        this._input.update();
        requestAnimationFrame(this._update.bind(this));
    }

    /**
     * Clear canvas and render scene.
     * 
     * @param dt  
     */
    private _render(dt: number): void {
        this._renderer.renderRect(0, 0, this._viewPort.width, this._viewPort.height, this._options.clearColor);
        this._sceneManager.render(dt);
    }
}