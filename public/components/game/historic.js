/*
 * number = INTEGER
 * string = TEXT
 *
 * games:
 * id: number PRIMARY KEY AUTOINCREMENT
 * p1: number
 * p2: number
 * score1: number
 * score2: number
 * date: number
 *
 * players:
 * name: string PRIMARY KEY
 * elo: number
 */
export class Hitoric {
    constructor(name) {
        this.name = name;
        this.getProfile();
        this.getHistoric();
    }
    getProfile() {
        //call the backend!
        /*
         * SELECT elo FROM players WHERE name = ?, [this.name]
         */
    }
    getHistoric() {
        //call the backend!
        /*
         * SELECT * FROM games WHERE p1 = ? or p2 = ? ORDER BY date DESC, [this.name]
         */
    }
    getHtml() {
        //return plein de div des derniere game!
        /*
         * for (i < 10)
         * var p1;
         * var p2;
         * var s1;
         * var s2;
         * if (p2 == name)
         *		p1,p2 = p2,p1
         *		s1,s2 = s2,s1
         * var date; //convert
         * var win = s1 > s2;
         * var DivColor = ["red", "blue"][win];
         * var DivText = ["lose", "win"][win];
         * eloP2 = SELECT elo FROM players WHERE name = ?, [p2]
         * <div class="game" id=i color=DivColor>DivText vs p2 (eloP2) [s1 s2]</div>
         */
    }
    getWinrate() {
        /*
         * for (i < 10)
         * if (p2 == name)
         * win = s2 == 10
         * else
         * win = s1 == 10
         */
        //analyse des games
    }
    getGraphs() {
        var winrate = this.getWinrate();
        //return canvas avec stats
    }
}
