class HistoricGame
{
	p1:string
	p2:string
	s1:number
	s2:number
	def:string
	constructor(p1:string, p2:string, s1:string, s2:string, def:string)
	{
		this.p1 = p1;
		this.p2 = p2;
		this.s1 = Number(s1);
		this.s2 = Number(s2);
		this.def = def;
	}

	_win()
	{
		return Number(this.s1 > this.s2);
	}

	HTMLrenderGame(div: HTMLElement)
	{
		const colors = ["background: linear-gradient(135deg, #f44336 0%, #e57373 100%); box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3)", "background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3)"];

		var newGame = document.createElement('div');
		newGame.style.cssText = `${colors[this._win()]}; padding: 20px; border-radius: 12px; color: white;`
		newGame.innerHTML = `
		<div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">${this.def}</div>

		<div style="font-size: 2.5rem; font-weight: bold;">${this.p1} vs ${this.p2}</div>
		<div style="font-size: 2.5rem; font-weight: bold;">${this.s1} vs ${this.s2}</div>
		`;

		div.appendChild(newGame);
	}
}

export class Historic
{
	name:string | null = null;
	games: HistoricGame[] = [];

	reset(name:string)
	{
		this.name = name;
		this.games = [];
	}

	_stats()
	{
		var win = 0;
		var lose = 0;
		var winStreak = 0;
		for (let indx in this.games)
		{
			const game = this.games[this.games.length - Number(indx) - 1];
			if (game._win())
			{
				win += 1;
				winStreak += 1;
			}
			else
			{
				lose += 1;
				winStreak = 0;
			}
		}
		return [win, lose, Math.ceil(win / (win + lose) * 100), winStreak];
	}

	_addGame(p1:string, p2:string, s1:string, s2:string, d:string)
	{
		const x = new HistoricGame(p1, p2, s1, s2, d);
		this.games.push(x);
	}

	addGame(def:string, names:string, scores:string)
	{
		if (def == "endb")
		{
			this.HTMLrenderHistoric();
			return ;
		}
		var [p1, p2] = names.split('#');
		var [s1, s2] = scores.split('#');
		if (p1 == this.name)
			this._addGame(p1, p2, s1, s2, def);
		else
			this._addGame(p2, p1, s2, s1, def);
	}

	HTMLrenderHistoric()
	{
		const matchList = document.getElementById("match-list");
		if (!matchList)
			return ;
		matchList.innerHTML = "";
		for (let game of this.games)
			game.HTMLrenderGame(matchList);

		let [win, lose, wr, ws] = this._stats();
		const statWin = document.getElementById("stat-win");
		if (statWin)
			statWin.innerText = `${win}`;
		const statLose = document.getElementById("stat-lose");
		if (statLose)
			statLose.innerText = `${lose}`;
		const statWR = document.getElementById("stat-win-rate");
		if (statWR)
			statWR.innerText = `${wr}`;
		const statWS = document.getElementById("stat-win-streak");
		if (statWS)
			statWS.innerText = `${ws}`;
	}
}
