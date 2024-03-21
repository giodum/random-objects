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
  }
}

const main = new Main()
