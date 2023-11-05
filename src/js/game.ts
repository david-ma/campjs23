import { World, EventQueue } from '@dimforge/rapier2d'
import { Asteroid } from './asteroid'
import { SpaceShip } from './gameSpaceShip'

// import type rapier from '@dimforge/rapier2d';
export type rapier2d = typeof import('@dimforge/rapier2d')

export class Game {
  public world: World
  public asteroids: Asteroid[]
  public spaceship: SpaceShip
  private eventQueue: EventQueue;
  constructor(public rapier: rapier2d, public options) {
    // let gravity = new rapier2d.Vector2(0.0, -9.81);
    let gravity = new rapier.Vector2(0, 0)
    this.world = new rapier.World(gravity)
    this.asteroids = []
    this.eventQueue = new this.rapier.EventQueue(true)
    this.spaceship = new SpaceShip(this);
  }

  SpawnAsteroid() {}
  step() {
    this.world.step(this.eventQueue)
    this.world.debugRender();
    this.asteroids.forEach(asteroid => {
        asteroid
    })
    console.log(this.spaceship.Position);
    
    // debugger;
    

    this.eventQueue.drainCollisionEvents((handle1, handle2, started) => {
      //When the collision happens, do something about the ship
      debugger;
      console.log({handle1, handle2, started});
      
    })
    this.eventQueue.drainContactForceEvents(event => {
      let handle1 = event.collider1(); // Handle of the first collider involved in the event.
      let handle2 = event.collider2(); // Handle of the second collider involved in the event.
      /* Handle the contact force event. */
      debugger;
  });
  this.world.intersectionsWith(this.spaceship._rigidBody.collider(0), (otherCollider) => {
    // This closure is called on each collider potentially
    // intersecting the collider `collider`.
    debugger;
});
  }
}
