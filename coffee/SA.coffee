import {globals} from './globals.js'
import {ALPHABET, setN, State} from './states.js'

export class SA extends State # Halvbord

	setN : ->

		# bygg koordinatlistor
		@N = globals.N
		@dx = 100/(@N+2)*2
		if @dx > 10 then @dx=10
		@dy = 0.9*@dx
		@x = []
		@y = []
		for i in range @N/2
			@x.push @dx + i * @dx
			@y.push 45-@dy/2
		x1 = @x.slice()
		_.reverse(@x)
		@x = x1.concat @x
		for i in range @N/2
			@y.push 45+@dy/2

	draw : ->
		#@drawControls()
		players = globals.ronder[globals.rond]
		textSize 0.7*@dy

		for iPlace in range @N 
			fill 'gray'
			rect @x[iPlace],@y[iPlace],@dx,@dx
			fill ['white','black'][iPlace%2]
			text 1+iPlace,@x[iPlace],@y[iPlace]

			y = if iPlace >= @N/2 then @dy else -@dy
			fill if players[iPlace] == 0 then 'red' else 'black'
			text ALPHABET[players[iPlace]],@x[iPlace],@y[iPlace] + y
