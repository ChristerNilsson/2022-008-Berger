import {globals,invert} from './globals.js'
import {ALPHABET, State, grid} from './states.js'

export class SF extends State # Berger Spelare

	constructor : (name) ->
		super name
		@halfTable = true

	setN : ->
		@N = globals.N
		@dx = 99/@N
		if @dx > 10 then @dx=10
		@dy = 99/(@N+1)
		if @dy > 10 then @dy=10
		@xoff = @dx
		@yoff = @dy

	draw: ->
		#super()

		textSize @dy/2
		textAlign CENTER
		text "#{@N}",@dx/2,@yoff-@dy/2
		for i in range @N
			text ALPHABET[i],@dx/2,@yoff+@dy/2+@dy*i
		for rond in range @N-1
			players = invert globals.ronder[rond]
			fill 'black'
			text rond+1,@dx*1.5+@dx*rond,@yoff-@dy/2

			for iPlace in range @N
				iPlayer = players[iPlace]
				p = iPlayer
				if @halfTable == false
					if p >= @N/2 then p = @N-1-p
				fill ['white','black'][iPlayer % 2]
				textAlign [RIGHT,LEFT][iPlayer % 2]
				x = @xoff + @dx/2+@dx*rond + [0.45*@dx,-0.45*@dx][iPlayer % 2]
				y = @yoff + 0.3*@dy+@dy*iPlace
				text p+1,x,y
			textAlign CENTER
		grid @xoff,@dx, @N-1, @yoff, @dy, @N

