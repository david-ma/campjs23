import { RigidBody } from '@dimforge/rapier2d'
import { Game } from './game'

export class SpaceShip {
  public _rigidBody: RigidBody
  public shieldRad: number = 150
  private x: number = 200
  private y: number = 300
  public uniqueID: string

  constructor(private game: Game) {
    this.uniqueID = "ship"+(""+Math.random()).substring(2,7)

    let rigidBodyDesc =
      game.rapier.RigidBodyDesc.dynamic().setTranslation(
        200,
        300
      )
    this._rigidBody = game.world.createRigidBody( rigidBodyDesc);
    let colliderDesc = game.rapier.ColliderDesc.ball(this.shieldRad)
    .setSensor(true);
    let collider = game.world.createCollider(colliderDesc, this._rigidBody)
  }

  move(direction) {
    console.log("moving ship")
    if (direction === 'up') {
      this.y -= 50
    }
    if (direction === 'down') {
      this.y += 50
    }
    if (direction === 'forward') {
        this.x += 50
    }
    if (direction === 'backward') {
        this.x -= 50
    }    
  }

  get Position() {
    // This didn't work :(
    // return this._rigidBody.translation()

    // I'm (currently) writing the drawer to expect this:
    return {
      x: this.x,
      y: this.y,
    }
  }
}
