import { World, EventQueue } from '@dimforge/rapier2d'
import { Asteroid } from './asteroid'
import { SpaceShip } from './gameSpaceShip'
import { OptionsType } from 'js'
import { draw_debug } from './graphics'

// import type rapier from '@dimforge/rapier2d';
export type rapier2d = typeof import('@dimforge/rapier2d')

export class Game {
  public world: World
  public asteroids: Asteroid[]
  public spaceship: SpaceShip
  private eventQueue: EventQueue;
  private wooshAudioContext: AudioContext;
  private wooshSound: HTMLAudioElement;

  private shieldAudios: HTMLAudioElement[];
  private asteroidAudios: HTMLAudioElement[];

  constructor(public rapier: rapier2d, public options: OptionsType) {
    // let gravity = new rapier2d.Vector2(0.0, -9.81);
    let gravity = new rapier.Vector2(0, 0)
    this.world = new rapier.World(gravity)
    this.asteroids = [];
    this.eventQueue = new this.rapier.EventQueue(true)
    this.spaceship = new SpaceShip(this);
    this.wooshAudioContext = new AudioContext();
    this.wooshSound = document.getElementById("wooshSound") as (HTMLAudioElement);
    // pass it into the audio context
    // const track = this.wooshAudioContext.createMediaElementSource(wooshSound);

    this.asteroids.push(new Asteroid(this))
    this.asteroids.push(new Asteroid(this))

    this.SpawnAsteroid = this.SpawnAsteroid.bind(this)

    // setInterval(this.SpawnAsteroid, 2000);
  }

  SpawnAsteroid() {
    this.asteroids.push(new Asteroid(this));
  }

  step() {
    this.world.step(this.eventQueue)
    let render_buffers = this.world.debugRender();
    draw_debug(render_buffers);
    // console.log(this.spaceship.Position);



    this.eventQueue.drainCollisionEvents((handle1, handle2, started) => {
      //When the collision happens, do something about the ship
      console.log({ handle1, handle2, started });
      // Started denotes that the asteroid has gone inside the ship, if false, outside
      let rbCol = this.spaceship._rigidBody.collider(0);
      // if (started && handle1 == rbCol.handle || handle2 == rbCol.handle) {
      if (started && handle1 == rbCol.handle) {

        let asteroid = this.asteroids.find((a) => {
          return a._rigidBody.collider(0).handle == handle2;
        })

        if (!asteroid) {
          console.log("Something went wrong");

        } else {
          console.log("asteroid", asteroid)
          var audio = new Audio("/audio/crash.m4a")
          audio.play()
          console.log("refelct asteroid", asteroid)
          asteroid.reflect();
        }

      }

      // if (handle1 == this.spaceship._rigidBody.handle || handle2 == this.spaceship._rigidBody.handle) {
      //   debugger;
      // }

    })
  }
}
