import { Game } from "./game";

const spaceship = {
  shieldRad: 150,
  x: 200,
  y: 300,
}


export class SpaceShip {
    /**
     *
     */
    constructor(private game: Game) {
        
        let rigidBodyDesc = game.rapier.RigidBodyDesc.kinematicVelocityBased()
            .setTranslation(
                800,
                300,

            );
        let rigidBody = game.world.createRigidBody(rigidBodyDesc);

        // Create a cuboid collider attached to the dynamic rigidBody.
        let colliderDesc = game.rapier.ColliderDesc.cuboid(0.5, 0.5);
        let collider = game.world.createCollider(colliderDesc, rigidBody);
        
    }

}