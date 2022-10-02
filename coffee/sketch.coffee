import {globals} from './globals.js'
import {setState, setN, setRond} from './states.js'
import {SA} from './SA.js'
import {SB} from './SB.js'
import {SC} from './SC.js'
import {SD} from './SD.js'
import {SE} from './SE.js'
import {SF} from './SF.js'
import {SG} from './SG.js'
import {SH} from './SH.js'

createState = (key,klass) -> globals.states[key] = new klass key

window.windowResized = -> resizeCanvas innerWidth, innerHeight

window.setup = ->
	canvas = createCanvas innerWidth,innerHeight #,SVG

	background 'black'
	textAlign CENTER,CENTER
	rectMode CENTER
	angleMode DEGREES
	
	createState 'SA', SA
	createState 'SB', SB
	createState 'SC', SC
	createState 'SD', SD
	createState 'SE', SE
	createState 'SF', SF
	createState 'SG', SG
	createState 'SH', SH

	setState 'SG'
	setN 0
	setRond 0

window.mouseClicked = -> globals.currState.mouseClicked()

window.draw = ->
	scale width/100,height/100 # portrait
	strokeWeight 100/height
	background 'gray'
	globals.currState.drawControls()
	globals.currState.draw()
