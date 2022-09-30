import {globals} from './globals.js'
import {setState, setN, setRond, SA,SB,SC,SD,SE} from './states.js'

createState = (key,klass) -> globals.states[key] = new klass key

window.windowResized = -> resizeCanvas innerWidth, innerHeight

window.setup = ->
	canvas = createCanvas innerWidth,innerHeight

	background 'black'
	textAlign CENTER,CENTER
	rectMode CENTER
	angleMode DEGREES

	createState 'SA', SA
	createState 'SB', SB
	createState 'SC', SC
	createState 'SD', SD
	createState 'SE', SE

	setState 'SD'
	setN 0
	setRond 0

window.mousePressed = -> globals.currState.mouseClicked()

window.draw = ->
	scale width/100,height/100 # portrait
	strokeWeight 100/height
	background 'gray'
	globals.currState.draw()
