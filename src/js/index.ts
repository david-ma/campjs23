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

let audioContext = null,
    audio = null

function initAudio() {
  audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const now = audioContext.currentTime;
  audio = new Audio("/audio/engines.m4a");
  const source = audioContext.createMediaElementSource(audio);
  source.connect(audioContext.destination);
}

import('@dimforge/rapier2d').then((RAPIER) => {
  let game = new Game(RAPIER, options)

  //make a collider on the mouse and make a debug collision thing on it
  let rigidBodyDesc =
    game.rapier.RigidBodyDesc.kinematicPositionBased().setTranslation(800, 300)

  let rigidBody = game.world.createRigidBody(rigidBodyDesc);
  const ballsize = 100;
  let colliderDesc = game.rapier.ColliderDesc.ball(ballsize);
  let collider = game.world.createCollider(colliderDesc, rigidBody);
  // This is the thing that enables the collision events to be drained
  collider.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
  

  screen.on("click", function (event) {
    if(!audio) {
      initAudio()
    }
    var coordinates = d3.pointer(event);
    var x = coordinates[0];
    var y = coordinates[1];
    // rigidBody.setTranslation(new Vector2(200, 300), true);
    rigidBody.setTranslation(new Vector2(x, y), true);

    console.log("setting the pos to 200, 300")
    // rigidBody.setTranslation(new Vector2(x, y), true);
    //Draw ball on mouse

    screen.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", ballsize)
      .attr("fill", 'red')

    console.log("coordinates", coordinates);
  });

  addEventListener('keypress', (event) => {
    console.log("Press!")
    if(audio) {
      audio.play()
    }

    // audio.start
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
  });

  // // Game loop. Replace by your own game loop system.
  gui.init(game)
  let gameLoop = () => {
    // Set the simulation forward.
    // Rapier uses an internal deltaTime so raf is not needed
    game.step();

    gui.update(game)

    setTimeout(gameLoop, 16)
  }

  gui.welcome(gameLoop)
})
