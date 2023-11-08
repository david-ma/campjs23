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
  public uniqueID: string;

  constructor(game: Game) {
    console.log("Constructing Asteroid")
    this.uniqueID = "asteroid"+(""+Math.random()).substring(2,7)

    // Create a dynamic rigid-body.
    // let randx = game.options.width + Math.random() * 50;
    let randx = game.options.width + 100;
    let randy = Math.random() * game.options.height;
    this.radius = minRad + Math.random() * (maxRad - minRad);
    let rigidBodyDesc =
      game.rapier.RigidBodyDesc.kinematicVelocityBased().setTranslation(
        randx,
        randy
      )
    this._rigidBody = game.world.createRigidBody(rigidBodyDesc)

    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = game.rapier.ColliderDesc.ball(this.radius);
    let collider = game.world.createCollider(colliderDesc, this._rigidBody)
    collider.setActiveEvents(game.rapier.ActiveEvents.COLLISION_EVENTS);
    let loc = new Vector2(randx, randy);
    // let vel = new Vector2(game.spaceship.Position.x - loc.x,game.spaceship.Position.y - loc.y );
    // The asteroid should just fly to the left
    let vel = new Vector2(-1, 0);

    let mag = magnitude(vel);
    let speed = minVel + Math.random() * (maxVel - minVel);
    vel = new Vector2((vel.x/mag) * speed, (vel.y/mag) * speed);
    this._rigidBody.setLinvel(vel, true);
  }

  get Position() {
    return this._rigidBody.translation()
  }
  
  reflect() {
    let initVel = this._rigidBody.linvel();
    let newVel = new Vector2(initVel.x * -1.1, initVel.y * -1.1);
    this._rigidBody.setLinvel(newVel, true);
  }
}
