import { IState } from "./state";
import { Canvas2DRenderer } from "../canvas2drenderer";

export interface StateMachineOptions {
    maxHistoryLenght?: number;
}

let _defaultOptions: StateMachineOptions = {
    maxHistoryLenght: 10
}

export class StateMachine<T> {

    //********************************************
    //** attributes:
    //********************************************
    
    private _options      : StateMachineOptions;
    private _currentState : IState<T>;
    private _historyStack : IState<T>[] = [];
    private readonly _entity       : T;

    //********************************************
    //**ctor:
    //********************************************
    
    /**
     * 
     * @param entity The owner of this state manager. 
     * @param [options] State machine options.
     */
    constructor(entity: T, options?:StateMachineOptions) {
        this._options = Object.assign({}, _defaultOptions, options);
        this._entity  = entity;
    }

    /**
     * Sets the current state.
     * 
     * @param state 
     */
    setCurrent(state: IState<T>): void {
        this._currentState = state;
        this._currentState.init(this._entity);
    }

    /**
     * Sets the active state and removes resets history. 
     * 
     * @param state 
     */
    setCurrentAndClearHistory(state: IState<T>): void {
        if (state == null) {
            throw new Error("State cannot be null or undefined");
        }

        this._historyStack = [];
        this._currentState = state;
        this._currentState.init(this._entity);
    }
    
    /**
     * Sets state history.
     * 
     * @param states 
     */
    setHistory(states: IState<T>[]): void {
        this._historyStack = states.slice(0, this._options.maxHistoryLenght);
    }


    /**
     * 
     * @param state 
     */
    change(state: IState<T>): void {
        if (state == null) {
            throw new Error("State cannot be null or undefined");
        }
        
        if (this._currentState != null) {
            this._historyStack.push(this._currentState);
        }
        if (this._historyStack.length > this._options.maxHistoryLenght) {
            this._historyStack.unshift(); // remove bottom state of stack.
        }

        this._currentState = state;
        this._currentState.init(this._entity);
    }

    /**
     * Pops the current state off the top off the history stack
     */
    pop(): IState<T> {
        if (this._historyStack.length <= 0) {
            return null;
        }
        return this._historyStack.pop();
    }

    /**
     * Updates current state. 
     * 
     * @param dt 
     */
    update(dt: number): void {
        if(this._currentState != null) {
            this._currentState.update(dt, this._entity);
        }
    }

    /**
     * Renders current state.
     * 
     * @param dt 
     * @param renderer 
     */
    render(dt: number): void {
        if (this._currentState != null) {
            this._currentState.render(dt, this._entity);
        }
    }
}