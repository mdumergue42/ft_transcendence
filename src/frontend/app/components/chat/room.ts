export class Room
{
	admin: number = 0;
	inRoom: number = 0;
	players: string[] = [];
	constructor()
	{
	}

	createRoom()
	{
		//exit existing room?
	}

	_op()
	{
		if (this.inRoom == 1 && this.admin == 1)
			return 1;
		console.log("you are not OP");
		return 0;
	}

	invite()
	{
		if (!this._op())
			return ;
	}

	_addPlayer(name: string)
	{
		this.players.push(name);
	}

	addBot()
	{
		if (!this._op())
			return ;
		this._addPlayer("CP");
	}

	lanchGame()
	{
		if (this.players.length != 2)
			console.log("need 2 players");
	}

	lanchTournament()
	{
		//TODO 8 / 16 ?
		if (this.players.length != 4)
			console.log("need 4 players");
	}

	//join?
}
