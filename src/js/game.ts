import { World } from '@dimforge/rapier2d'
import { Asteroid } from './asteroid'
import { SpaceShip } from './gameSpaceShip'

// import type rapier from '@dimforge/rapier2d';
export type rapier2d = typeof import('@dimforge/rapier2d')

export class Game {
  public world: World
  public asteroids: Asteroid[]
  public spaceship: SpaceShip

  constructor(public rapier: rapier2d, public options) {
    // let gravity = new rapier2d.Vector2(0.0, -9.81);
    let gravity = new rapier.Vector2(0, 0)
    this.world = new rapier.World(gravity)
    this.spaceship = new SpaceShip(this);
    this.asteroids = []
  }

  SpawnAsteroid() {}
  step() {
    let eventQueue = new this.rapier.EventQueue(true)
    this.world.step(eventQueue)

    this.asteroids.forEach(asteroid => {
        asteroid
    })

    eventQueue.drainCollisionEvents((handle1, handle2, started) => {
      //When the collision happens, do something about the ship
    })
  }
}
