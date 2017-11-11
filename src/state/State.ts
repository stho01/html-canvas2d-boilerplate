import { Canvas2DRenderer } from "../canvas2drenderer";

export interface IState<T> {

    init(entity: T): void;

    update(dt: number, entity: T): void;
    
    render(dt: number, entity: T): void;

}