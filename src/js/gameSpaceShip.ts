import { RigidBody } from '@dimforge/rapier2d'
import { Game } from './game'

export class SpaceShip {
  private _rigidBody: RigidBody
  public shieldRad: number = 150
  private x: number = 200
  private y: number = 300

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
