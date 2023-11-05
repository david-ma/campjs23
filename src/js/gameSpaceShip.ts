import { RigidBody } from '@dimforge/rapier2d'
import { Game } from './game'

export class SpaceShip {
  public _rigidBody: RigidBody
  public shieldRad: number = 150
  private x: number = 200
  private y: number = 300

  constructor(private game: Game) {
    let rigidBodyDesc =
      game.rapier.RigidBodyDesc.dynamic().setTranslation(
        200,
        300
      )
    this._rigidBody = game.world.createRigidBody( rigidBodyDesc);
    let colliderDesc = game.rapier.ColliderDesc.ball(this.shieldRad)
    .setSensor(true);
    let collider = game.world.createCollider(colliderDesc, this._rigidBody)
    .setActiveCollisionTypes(game.rapier.ActiveCollisionTypes.DEFAULT|
      game.rapier.ActiveCollisionTypes.KINEMATIC_FIXED);
  }

  move(direction) {
    if (direction === 'up') {
      this.y -= 50
    }
    if (direction === 'down') {
      this.y += 50
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
