import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

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

    // setting up directional light
    this.directionalLight = new THREE.DirectionalLight(0x9090aa)
    this.directionalLight.position.set(-300, -300, -500).normalize()
    this.scene.add(this.directionalLight)

    // setting up hemisphere light
    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    this.hemisphereLight.position.set(1, 1, 1)
    this.scene.add(this.hemisphereLight)

    // meshes
    this.geometry = new THREE.BoxGeometry(20, 20, 20)
    this.material = new THREE.MeshStandardMaterial({color: 0x555555})
    this.meshes = []

    for (let i = 0; i < N; i++) {
      const mesh = new THREE.Mesh(this.geometry, this.material)
      this.meshes.push(mesh)
      this.scene.add(mesh)
    }

    // temp orbit control
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement)
    this.orbit.update()

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
    const time = Math.random() * 2000 + 250

    // random parameters for movement
    const sx = Math.random() * 3
    const sy = Math.random() * 3
    const sz = Math.random() * 2
    const yaw = Math.random() * 1000
    const pitch = Math.random() * 1200
    const dist = Math.random() * 500 + 250

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
    }, time)
  }

  animate(time) {
    // console.log(
    //   Math.sin(time / 3000) * 1000 + ', 20, ' + Math.cos(time / 3000) * 1000
    // )
    this.camera.position.set(
      Math.sin(time / 3000) * 1000,
      20,
      Math.cos(time / 3000) * 1000
    )
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    // update tween sequence
    TWEEN.update()

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame((time) => this.animate(time))
  }

  static init() {
    if (!Scene3D.item) {
      Scene3D.item = new Scene3D()
    }
  }
}
