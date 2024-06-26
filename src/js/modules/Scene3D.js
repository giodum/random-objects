import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import * as TWEEN from '@tweenjs/tween.js'

import random from 'canvas-sketch-util/random'

const N = 64

export default class Scene3D {
  // singleton pattern
  static item = null

  constructor() {
    // check previous existance of the instance
    if (Scene3D.item) {
      throw new Error('Scene3D has already been initialized')
    }

    // initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.querySelector('canvas'),
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // initialize scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    // // axes helper
    // const axesHelper = new THREE.AxesHelper(100)
    // this.scene.add(axesHelper)

    // grid helper
    // let gridHelper = new THREE.GridHelper(100, 100)
    // this.scene.add(gridHelper)

    // initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      10,
      10000
    )
    this.camera.position.set(100, 100, 100)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    // setting up ambient light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2)
    this.ambientLight.position.set(-300, -300, -500).normalize()
    this.scene.add(this.ambientLight)

    // setting up hemisphere light
    // this.hemisphereLight = new THREE.HemisphereLight('blue', 'red', 5)
    // this.hemisphereLight.position.set(0, 0, 0)
    // this.scene.add(this.hemisphereLight)

    // const hemisphereLightHelper = new THREE.HemisphereLightHelper(
    //   this.hemisphereLight,
    //   5
    // )
    // this.scene.add(hemisphereLightHelper)

    // meshes
    this.geometry = new THREE.BoxGeometry(20, 20, 20)
    // this.geometry = new THREE.TorusGeometry(18, 2, 100, 16)
    // this.material = new THREE.MeshStandardMaterial({color: 0x555555})
    this.material = new THREE.MeshNormalMaterial()
    this.meshes = []

    for (let i = 0; i < N; i++) {
      const mesh = new THREE.Mesh(this.geometry, this.material)
      this.meshes.push(mesh)
      this.scene.add(mesh)
    }

    // temp orbit control
    // this.orbit = new OrbitControls(this.camera, this.renderer.domElement)
    // this.orbit.update()

    // set event listeners
    this.eventListeners()

    // tween and animation cycle
    this.animateTween()
    this.animate()
  }

  eventListeners() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  animateTween() {
    // random time necessary for the animation
    const time = this.#normalizedGaussian() * 2000 + 250

    // random parameters for movement
    const sx = this.#normalizedGaussian() * 3
    const sy = this.#normalizedGaussian() * 3
    const sz = this.#normalizedGaussian() * 2
    const yaw = this.#normalizedGaussian() * 1000
    const pitch = this.#normalizedGaussian() * 1200
    const dist = this.#normalizedGaussian() * 500 + 250

    const lookAtZero = Math.random() > 0.5 ? true : false

    // update every mesh
    for (let i = 0; i < this.meshes.length; i++) {
      // get the current element
      const mesh = this.meshes[i]

      // get normalized parameter for meshes distribution (from -0.5 to 0.5)
      const n = i / this.meshes.length - 0.5

      // create new temporary object as reference
      const tmpObj = new THREE.Object3D()

      // set properties to reference object
      tmpObj.rotateX((pitch * n * Math.PI) / 180)
      tmpObj.rotateY((yaw * n * Math.PI) / 180)
      tmpObj.translateZ(dist)
      tmpObj.scale.set(sx, sy, sz)

      if (lookAtZero) {
        tmpObj.lookAt(new THREE.Vector3(1, 0, 0))
      }

      // animate properties of current mesh
      new TWEEN.Tween(mesh.position)
        .to(tmpObj.position, time - 100)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
      new TWEEN.Tween(mesh.scale)
        .to(tmpObj.scale, time - 100)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
      new TWEEN.Tween(mesh.rotation)
        .to(tmpObj.rotation, time - 100)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
    }

    // wait until the end of the previous animation
    // before programming a new one
    setTimeout(() => {
      this.animateTween()
    }, time + 400)
  }

  animate(time) {
    this.camera.position.set(
      Math.sin(time / 3000) * 600,
      20,
      Math.cos(time / 3000) * 600
    )
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    // update tween sequence
    TWEEN.update()

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame((time) => this.animate(time))
  }

  #normalizedGaussian(mean = 0.5, std = 1) {
    const value = random.gaussian(mean, std)
    return Math.abs((value - mean) / (2 * std)).toFixed(2)
  }

  static init() {
    if (!Scene3D.item) {
      Scene3D.item = new Scene3D()
    }
  }
}
