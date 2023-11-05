import { World, Vector2, RigidBody } from '@dimforge/rapier2d'
import { Game, rapier2d } from './game'
import { makeLogger } from 'ts-loader/dist/logger';
const minRad = 100;
const maxRad = 300;
const minVel = 200;
const maxVel = 500;


function magnitude(vel: Vector2) {
 return Math.sqrt(vel.x * vel.x + vel.y * vel.y);
}
export class Asteroid {
  public _rigidBody: RigidBody
  public radius: number;

  constructor(game: Game) {
    console.log("Constructing Asteroid")

    // Create a dynamic rigid-body.
    let randx = game.options.width + Math.random() * 50;
    let randy = Math.random() * game.options.height;
    let radius = minRad + Math.random() * (maxRad - minRad);
    let rigidBodyDesc =
      game.rapier.RigidBodyDesc.kinematicVelocityBased().setTranslation(
        randx,
        randy
      )
    this._rigidBody = game.world.createRigidBody(rigidBodyDesc)

    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = game.rapier.ColliderDesc.ball(radius);
    let collider = game.world.createCollider(colliderDesc, this._rigidBody)
    let loc = new Vector2(randx, randy);
    let vel = new Vector2(game.spaceship.Position.x - loc.x,game.spaceship.Position.y - loc.y );
    let mag = magnitude(vel);
    let speed = minVel + Math.random() * (maxVel - minVel);
    vel = new Vector2((vel.x/mag) * speed, (vel.y/mag) * speed);
    this._rigidBody.setLinvel(vel, true);
  }

  get Position() {
    return this._rigidBody.translation()
  }

  get uniqueID() {
    return this._rigidBody.collider(0).handle
  }
  
  reflect() {
    let initVel = this._rigidBody.linvel();
    let newVel = new Vector2(initVel.x * -1.1, initVel.y * -1.1);
    this._rigidBody.setLinvel(newVel, true);
  }
}
