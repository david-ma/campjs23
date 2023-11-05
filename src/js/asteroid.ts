import type { World, Vector2, RigidBody } from '@dimforge/rapier2d'
import { Game, rapier2d } from './game'
export class Asteroid {
  private _rigidBody: RigidBody
  constructor(game: Game) {
    // Create a dynamic rigid-body.
    let rigidBodyDesc =
      game.rapier.RigidBodyDesc.kinematicVelocityBased().setTranslation(
        800,
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
