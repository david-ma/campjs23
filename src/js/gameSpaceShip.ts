import { RigidBody } from '@dimforge/rapier2d'
import { Game } from './game'

export class SpaceShip {
  private _rigidBody: RigidBody
  public shieldRad: number = 150

  constructor(private game: Game) {
    let rigidBodyDesc =
      game.rapier.RigidBodyDesc.kinematicVelocityBased().setTranslation(
        200,
        300
      )
    let rigidBody = game.world.createRigidBody(rigidBodyDesc)

    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = game.rapier.ColliderDesc.cuboid(0.5, 0.5)
    let collider = game.world.createCollider(colliderDesc, rigidBody)
  }

  get Position() {
    return this._rigidBody.translation()
  }
}
