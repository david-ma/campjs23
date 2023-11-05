import { RigidBody } from '@dimforge/rapier2d'
import { Game } from './game'

export class SpaceShip {
  public _rigidBody: RigidBody
  public shieldRad: number = 150

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

  get Position() {
    // This didn't work :(
    // return this._rigidBody.translation()

    // I'm (currently) writing the drawer to expect this:
    return {
      x: 200,
      y: 300,
    }
  }
}
