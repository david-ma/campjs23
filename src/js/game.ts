import { World } from "@dimforge/rapier2d";

// import type rapier from '@dimforge/rapier2d';
export type rapier2d = typeof import("@dimforge/rapier2d")

export class Game {
    public world:World;
    constructor(public rapier: rapier2d) {
        // let gravity = new rapier2d.Vector2(0.0, -9.81);
        let gravity = new rapier.Vector2(0, 0,);
        this.world = new rapier.World(gravity);

    }

    SpawnAsteroid() {


    }
    step() {
        let eventQueue = new this.rapier.EventQueue(true);
        this.world.step(eventQueue);

        eventQueue.drainCollisionEvents((handle1, handle2, started) => {
            //When the collision happens, do something about the ship
        });
    }
}