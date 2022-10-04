import {Dialogue, showDialogue, dialogues} from './dialogue.js'
import {globals} from './globals.js'
import {setState, setN,bergerSVG,saveData} from './states.js'
import {SG} from './SG.js'

Array.prototype.clear = -> @length = 0

createState = (key,klass) -> globals.states[key] = new klass key

window.windowResized = -> resizeCanvas innerWidth, innerHeight

window.setup = ->
	canvas = createCanvas innerWidth,innerHeight #,SVG

	background 'black'
	textAlign CENTER,CENTER
	rectMode CENTER
	angleMode DEGREES
	
	createState 'SG', SG
	setState 'SG'
	setN 0

window.mouseClicked = ->
	if dialogues.length == 0
		menu1()
	else
		dialogue = _.last dialogues
		dialogue.execute mouseX,mouseY

window.draw = ->
	push()
	scale width/100,height/100 # portrait
	strokeWeight 100/height
	background 'gray'
	globals.currState.drawControls()
	globals.currState.draw()
	pop()
	showDialogue()

menu1 = -> # Main Menu
	dialogue = new Dialogue()
	dialogue.add '-2', -> setN -2
	dialogue.add '+2', -> setN 2
	dialogue.add 'Download', ->
		data = bergerSVG width,height
		fileName = "#{globals.N}.svg"
		saveData() data, fileName
		dialogues.clear()
	dialogue.clock ' ',true,-60
