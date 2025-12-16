class HistoricGame
{
	p1:string
	p2:string
	s1:number
	s2:number
	def:string
	date:string
	constructor(p1:string, p2:string, s1:string, s2:string, def:string, date:string)
	{
		this.p1 = p1;
		this.p2 = p2;
		this.s1 = Number(s1);
		this.s2 = Number(s2);
		this.def = def;
		this.date = date;
	}

	_win()
	{
		return Number(this.s1 > this.s2);
	}

	HTMLrenderGame(div: HTMLElement)
	{
		var newGame = document.createElement('div');
		if (this._win())
			newGame.className = "block p-3 text-center relative border PBoxBg PBorder text-black";
		else
			newGame.className = "block p-3 text-center relative border PBoxBorder PText";
		newGame.innerHTML = `
		<div class="absolute top-1 left-1" style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px; text-transform: uppercase;">${this.def} - ${this.date}</div>

		<div style="font-size: 2.5rem; font-weight: bold;">${this.p1} ${this.s1} vs ${this.s2} ${this.p2}</div>
		`;

		div.appendChild(newGame);
	}
}

export class Historic
{
	name:string | null = null;
	error:string | null = null;
	isOnline:number = 0;
	games: HistoricGame[] = [];
	avatar:string | null = null;
	about: string | null = null;

	reset(name:string)
	{
		this.name = name;
		this.avatar = null;
		this.about = null;
		this.isOnline = 0;
		this.games = [];
	}

	_stats()
	{
		var win = 0;
		var lose = 0;
		var winStreak = 0;
		var k = 0;
		var d = 0;
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
			k += game.s1;
			d += game.s2;
		}
		if (d == 0)
			d = 1;
		return [win, lose, Math.ceil(win / (win + lose) * 100), winStreak, Math.ceil(k / d * 100) / 100];
	}

	_addGame(p1:string, p2:string, s1:string, s2:string, d:string, date:string)
	{
		const x = new HistoricGame(p1, p2, s1, s2, d, date);
		this.games.push(x);
	}

	addGame(msg:any)
	{
		if (msg.error != undefined) {
			if (msg.error == "endDb")
			{
				this.error = null;
				this.isOnline = msg.isOnline;
				this.avatar = msg.avatar;
				this.about = msg.desc;
			}
			if (msg.error == "noUser")
			{
				this.error = "user not found";
				this.avatar = msg.avatar;
				this.about = "";
				this.isOnline = 1;
			}
			this.HTMLrenderHistoric();
			return ;
		}
		var p1 = msg.p1;
		var p2 = msg.p2;
		var s1 = msg.s1;
		var s2 = msg.s2;
		if (p1 == this.name)
			this._addGame(p1, p2, s1, s2, msg.matchName, msg.date);
		else
			this._addGame(p2, p1, s2, s1, msg.matchName, msg.date);
	}

	HTMLrenderHistoric()
	{
		const matchList = document.getElementById("match-list");
		if (!matchList)
			return ;
		matchList.innerHTML = "";

		const ringOnline = document.getElementById("ring-online");
		const dotOnline = document.getElementById("dot-online");
		if (ringOnline && dotOnline)
		{
			if (this.error)
				dotOnline.style.backgroundColor = "red";
			else
				dotOnline.style.backgroundColor = "";
			dotOnline.style.opacity = `${this.isOnline * 100}`;
			ringOnline.style.opacity = `${(1 - this.isOnline) * 100}`;
		}
		var avatar = <HTMLImageElement>document.getElementById("avatar");
		if (avatar)
			avatar.src = `/image/avatar/${this.avatar}`;
		var about = <HTMLElement>document.getElementById("about-me");
		if (about)
			about.textContent = `${this.about}`;


		if (this.error)
		{
			matchList.innerHTML = "";
			matchList.textContent = `${this.error}`;
			return ;
		}

		for (let game of this.games)
			game.HTMLrenderGame(matchList);

		let [win, lose, wr, ws, kd] = this._stats();
		const statWin = document.getElementById("stat-win");
		if (statWin)
			statWin.innerText = `${win}`;
		const statLose = document.getElementById("stat-lose");
		if (statLose)
			statLose.innerText = `${lose}`;
		const statWR = document.getElementById("stat-win-rate");
		if (statWR)
			statWR.innerText = `${wr}%`;
		const statWS = document.getElementById("stat-win-streak");
		if (statWS)
			statWS.innerText = `${ws}`;
		const statKd = document.getElementById("stat-kd");
		if (statKd)
			statKd.innerText = `${kd}`;
	}
}
