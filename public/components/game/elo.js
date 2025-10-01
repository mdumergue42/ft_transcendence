const B = 400;
const K = 16;
export function newElo(elo0, elo1, winner = 0) {
    const Qa = Math.pow(10, elo0 / B);
    const Qb = Math.pow(10, elo1 / B);
    const Ea = Qa / (Qa + Qb);
    const Eb = 1 - Ea;
    elo0 += K * (1 - winner - Ea);
    elo1 += K * (winner - Eb);
    return [elo0, elo1];
}
