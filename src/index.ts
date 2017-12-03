import './style'
import * as $ from 'jquery'
import './libs/turn'
import PubSub from 'pubsub-js'
import Menu from './menu'
import Order from './order'
import Friend from './friend'
import Player from './player'

const body = $(document.body)

function startGame() {
  if (body.hasClass('on')) { return }
  body.addClass('on')

  startMainScene()

  setTimeout(function () {
    body.addClass('hide-loading-layer')
  }, 1010)
}

function startMainScene() {
  PubSub.subscribe('menu', (t, d) => console.log(t, d))
  PubSub.subscribe('order', (t, d) => console.log(t, d))
  const menu = new Menu()
  const order = new Order()
  const player = new Player()
  const friend = new Friend()

  PubSub.subscribe('menu.dish.select', (t, dish) => {
    order.addOrder(dish)
  })
}

if (document.readyState === 'complete') {
  setTimeout(startGame, 500)
} else {
  window.onload = startGame
  setTimeout(startGame, 20000)
}