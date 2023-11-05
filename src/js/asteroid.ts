import { World, Vector2, RigidBody } from '@dimforge/rapier2d'
import { Game, rapier2d } from './game'
import { makeLogger } from 'ts-loader/dist/logger';
const minRad = 100;
const maxRad = 300;
const minVel = 10;
const maxVel = 40;


function magnitude(vel: Vector2) {
 return Math.sqrt(vel.x * vel.x + vel.y * vel.y);
}
export class Asteroid {
  private _rigidBody: RigidBody
  public radius: number;

  constructor(game: Game) {
    // Create a dynamic rigid-body.
    let randx = game.options.width + Math.random() * 50;
    let randy = Math.random() * game.options.height;
    let radius = minRad + Math.random() * (maxRad - minRad);
    let rigidBodyDesc =
      game.rapier.RigidBodyDesc.kinematicVelocityBased().setTranslation(
        randx,
        randy
      )
    let rigidBody = game.world.createRigidBody(rigidBodyDesc)

    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = game.rapier.ColliderDesc.ball(radius);
    let collider = game.world.createCollider(colliderDesc, rigidBody)
    let loc = new Vector2(randx, randy);
    let vel = new Vector2(game.spaceship.Position.x - loc.x,game.spaceship.Position.y - loc.y );
    let mag = magnitude(vel);
    // let speed = 
    vel = new Vector2((vel.x/mag), vel.y/mag  )
    rigidBody.setLinvel(vel, true);
  }

  get Position() {
    return this._rigidBody.translation()
  }
}
