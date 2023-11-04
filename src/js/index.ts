console.log('hi this is index.ts where the rapier code is')

// @ts-ignore
import gui from './d3spaceship.ts'

const options = {
  width: 960,
  height: 600,
}

gui.setup(options)

const spaceship = {
  size: 1,
  x: 200,
  y: 300,
}

gui.drawSpaceship(spaceship)

// type Asteroid = {
//   x: number
//   y: number
// }
const asteroids = [
  {
    x: 800,
    y: 300,
  },
]

gui.drawAsteroids(asteroids)

// import('@dimforge/rapier2d').then(RAPIER => {
//   // Use the RAPIER module here.
//   let gravity = { x: 0.0, y: -9.81 };
//   let world = new RAPIER.World(gravity);

//   // Create the ground
//   let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1);
//   world.createCollider(groundColliderDesc);

//   // Create a dynamic rigid-body.
//   let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
//           .setTranslation(0.0, 1.0);
//   let rigidBody = world.createRigidBody(rigidBodyDesc);

//   // Create a cuboid collider attached to the dynamic rigidBody.
//   let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5);
//   let collider = world.createCollider(colliderDesc, rigidBody);

//   // Game loop. Replace by your own game loop system.
//   let gameLoop = () => {
//     // Ste the simulation forward.
//     world.step();

//     // Get and print the rigid-body's position .
//     let position = rigidBody.translation();
//     console.log("Rigid-body position: ", position.x, position.y);

//     setTimeout(gameLoop, 16);
//   };

//   gameLoop();
// })
