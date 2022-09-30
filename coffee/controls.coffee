import {globals} from './globals.js'

export class Control
	constructor : (@x,@y,@w,@h,@text='',@bg='black',@fg='white') ->
		@visible = true
		@disabled = false
		@textSize = 2
	draw : -> console.log 'Control.draw must be overriden!'
	inside : (x,y) ->
		w = @w * [height/width,width/height][1-globals.TOGGLE]
		-w/2 <= x-@x <= w/2 and -@h/2 <= y-@y <= @h/2

export class CDead extends Control
	constructor : (x,y,text,fg='white') ->
		super x,y,0,0,text,'black',fg
	draw : ->
		push()
		textSize 2
		fill 'black'
		text @text,@x,@y
		pop()

export class CRounded extends Control
	constructor : (x,y,w,h,text='', @clicker=null) ->
		super x,y,w,h,text,'black','white'
	draw : ->
		if @visible
			push()
			fill if @disabled then "gray" else 'black'
			rect @x,@y,@w,@h,@h/10
			textSize @textSize
			fill if @disabled then "black" else 'white'
			text @text,@x,@y
			pop()
	click : => if @clicker then @clicker()
