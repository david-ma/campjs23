console.log('hi this is index.ts where the rapier code is')

import gui, { drawSpaceship } from './graphics'
import { Game } from './game'
import * as d3 from 'd3'
import { Vector2 } from '@dimforge/rapier2d'

export type OptionsType = {
  width: number,
  height: number
}

const options = {
  width: 960,
  height: 600,
}

let screen = gui.setup(options)

import('@dimforge/rapier2d').then((RAPIER) => {
  let game = new Game(RAPIER, options)

  // Use the RAPIER module here.
  // let gravity = { x: 0.0, y: -9.81 };
  // let world = new RAPIER.World(gravity);

  // // Create the ground
  // let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1);
  // world.createCollider(groundColliderDesc);

  // // Create a dynamic rigid-body.
  // let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
  //         .setTranslation(0.0, 1.0);
  // let rigidBody = world.createRigidBody(rigidBodyDesc);

  // // Create a cuboid collider attached to the dynamic rigidBody.
  // let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5);
  // let collider = world.createCollider(colliderDesc, rigidBody);

  //make a collider on the mouse and make a debug collision thing on it
  let rigidBodyDesc =
    game.rapier.RigidBodyDesc.kinematicPositionBased().setTranslation(800, 300)

  let rigidBody = game.world.createRigidBody(rigidBodyDesc);
  const ballsize = 100;
  let colliderDesc = game.rapier.ColliderDesc.ball(ballsize);
  let collider = game.world.createCollider(colliderDesc, rigidBody);
  // collider.setSensor(true);
  collider.setActiveCollisionTypes(game.rapier.ActiveCollisionTypes.DEFAULT|
    game.rapier.ActiveCollisionTypes.KINEMATIC_FIXED);
  // Get mouse pos

  screen.on("click", function (event) {
    var coordinates = d3.pointer(event);
    var x = coordinates[0];
    var y = coordinates[1];
    // rigidBody.setTranslation(new Vector2(200, 300), true);
    rigidBody.setTranslation(new Vector2(x, y), true);
    console.log("setting the pos to 200, 300")
    // rigidBody.setTranslation(new Vector2(x, y), true);
    //Draw ball on mouse


  addEventListener('keypress', (event) => {
    switch (event.key) {
      case 'w':
        game.spaceship.move('up')
        break
      case 's':
        game.spaceship.move('down')
        break
      case 'd':
        game.spaceship.move('forward')
        break
      case 'a':
        game.spaceship.move('backward')
        break
    }
  })

    screen.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", ballsize)
      .attr("fill", 'red')
      

    console.log("coordinates", coordinates);
  });


//   (function animationLoop(prevMs) {
//     const nowMs = window.performance.now()
//     window.requestAnimationFrame(animationLoop.bind(null, nowMs));
//     const deltaMs = nowMs - prevMs;
//     step(deltaMs);
//     draw();
// })(window.performance.now());
  // // Game loop. Replace by your own game loop system.
  gui.init(game)
  let gameLoop = () => {
    // Ste the simulation forward.
    game.step();

    gui.update(game)

    setTimeout(gameLoop, 16)
  }

  gameLoop()
})

// function draw(timestamp) {
//   drawBackground();
//   drawPlayer();
//   requestAnimationFrame(draw)
// }

// const spaceship = {
//   size: 1,
//   x: 200,
//   y: 300,
// }

// gui.drawSpaceship(spaceship)

// // type Asteroid = {
// //   x: number
// //   y: number
// // }
// const asteroids = [
//   {
//     x: 800,
//     y: 300,
//   },
// ]

// gui.drawAsteroids(asteroids)
