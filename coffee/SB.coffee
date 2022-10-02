import {globals} from './globals.js'
import {ALPHABET, setN, State} from './states.js'
import {SA} from './SA.js'

export class SB extends SA # Bord

	draw : ->
		players = globals.ronder[globals.rond]
		textSize 0.7*@dy

		for iPlace in range @N 
			if iPlace < @N/2
				fill 'gray'
				rect @x[iPlace],@y[iPlace],@dx,@dx
				fill 'black'
				text 1+iPlace,@x[iPlace],@y[iPlace]

			y = if iPlace >= @N/2 then 0 else -@dy
			fill ['white','black'][iPlace%2] #if players[iPlace] == 0 then 'red' else 'black'
			text ALPHABET[players[iPlace]],@x[iPlace],@y[iPlace] + y
