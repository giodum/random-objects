// Inspired by jasonsturges tutorial - https://github.com/jasonsturges - https://jasonsturges.com/

import Scene3D from './modules/Scene3D'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

export default class Main {
  constructor() {
    this.init()
  }

  init() {
    Scene3D.init()
    // const COUNT = 64
    // const scene = new THREE.Scene()
    // scene.background = new THREE.Color(0x0)
    // const el = document.querySelector('canvas')
    // const renderer = new THREE.WebGLRenderer({antialias: true, canvas: el})
    // renderer.setSize(window.innerWidth, window.innerHeight)
    // document.body.appendChild(renderer.domElement)
    // // Camera
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   50,
    //   10000
    // )
    // camera.position.set(100, 100, 100)
    // camera.lookAt(new THREE.Vector3(0, 0, 0))
    // // Lights
    // const ambientLight = new THREE.DirectionalLight(0x9090aa)
    // ambientLight.position.set(-300, -300, -500).normalize()
    // scene.add(ambientLight)
    // const light = new THREE.HemisphereLight(0xffffff, 0x444444)
    // light.position.set(1, 1, 1)
    // scene.add(light)
    // // // axes helper
    // const axesHelper = new THREE.AxesHelper(100)
    // scene.add(axesHelper)
    // // grid helper
    // let gridHelper = new THREE.GridHelper(100, 100)
    // scene.add(gridHelper)
    // // Materials
    // const materials = []
    // let f = 0xff / COUNT
    // for (let i = 0; i < COUNT; i++) {
    //   let color = ((i * f) << 16) | ((i * f) << 8) | (i * f)
    //   let mat = new THREE.MeshBasicMaterial({color: color})
    //   materials.push(mat)
    // }
    // // Models
    // const models = []
    // let geometry = new THREE.BoxGeometry(20, 20, 20)
    // for (let i = 0; i < COUNT; i++) {
    //   let m = materials[i]
    //   let s = new THREE.Mesh(geometry, m)
    //   models.push(s)
    //   scene.add(s)
    // }
    // // Tween Models
    // function tweenModels() {
    //   const time = Math.random() * 1000 + 250
    //   const sx = Math.random() * 3
    //   const sy = Math.random() * 3
    //   const sz = Math.random() * 2
    //   const yaw = Math.random() * 1000
    //   const pitch = Math.random() * 1200
    //   const dist = Math.random() * 500 + 250
    //   const lookAtZero = Math.random() > 0.5 ? true : false
    //   for (let i = 0; i < models.length; i++) {
    //     const model = models[i]
    //     const n = i / models.length - 0.5
    //     const t = new THREE.Object3D()
    //     t.rotateX((pitch * n * Math.PI) / 180)
    //     t.rotateY((yaw * n * Math.PI) / 180)
    //     t.translateZ(dist)
    //     t.scale.set(sx, sy, sz)
    //     if (lookAtZero) {
    //       t.lookAt(new THREE.Vector3(1, 0, 0))
    //     }
    //     new TWEEN.Tween(model.position)
    //       .to(t.position, time - 100)
    //       .easing(TWEEN.Easing.Quadratic.InOut)
    //       .start()
    //     new TWEEN.Tween(model.scale)
    //       .to(t.scale, time - 100)
    //       .easing(TWEEN.Easing.Quadratic.InOut)
    //       .start()
    //     new TWEEN.Tween(model.rotation)
    //       .to(t.rotation, time - 100)
    //       .easing(TWEEN.Easing.Quadratic.InOut)
    //       .start()
    //   }
    //   setTimeout(() => {
    //     tweenModels()
    //   }, time)
    // }
    // tweenModels()
    // // Animate
    // const animate = (time) => {
    //   camera.position.set(
    //     Math.sin(time / 3000) * 1000,
    //     20,
    //     Math.cos(time / 3000) * 1000
    //   )
    //   camera.lookAt(new THREE.Vector3(0, 0, 0))
    //   TWEEN.update()
    //   renderer.render(scene, camera)
    //   requestAnimationFrame(animate)
    // }
    // animate()
    // // Resize
    // const resize = () => {
    //   renderer.setSize(window.innerWidth, window.innerHeight)
    //   camera.aspect = window.innerWidth / window.innerHeight
    //   camera.updateProjectionMatrix()
    // }
    // window.addEventListener('resize', resize)
  }
}

const main = new Main()
