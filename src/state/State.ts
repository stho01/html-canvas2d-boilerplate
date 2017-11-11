export interface IState<T> {
    /**
     * Initialize a scene
     */
    init(entity: T): void;

    /**
     * Unload scene  
     */
    pause(entity: T): void;

    /**
     * 
     */
    resume(entity: T): void;

    /**
     * Dispose scene
     */
    dispose(ebtity: T): void;

    /**
     * Update scene
     */
    update(dt: number, entity: T): void;
    
    /**
     * Render scene
     */
    render(dt: number, entity: T): void;
}