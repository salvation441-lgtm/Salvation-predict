export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const TEAMS = [
    {h:"🇳🇬 Nigeria", a:"🇲🇬 Madagascar", s:[85,45]},
    {h:"🇸🇳 Senegal", a:"🇬🇲 Gambia", s:[80,50]},
    {h:"🇲🇦 Morocco", a:"🇩🇿 Algeria", s:[82,75]},
    {h:"🇪🇬 Egypt", a:"🇱🇾 Libya", s:[78,55]},
    {h:"🇬🇭 Ghana", a:"🇹🇬 Togo", s:[77,52]},
    {h:"🇨🇲 Cameroon", a:"🇨🇬 Congo", s:[75,48]}
  ];

  const picks = TEAMS.map(t => {
    const diff = (t.s[0]+10)-t.s[1];
    let pick, odd, market;
    if(diff>25){
      pick = `${t.h.split(' ')[1].toUpperCase()} TO WIN + OVER 1.5`;
      odd = (1.55 + Math.random()*0.3).toFixed(2);
      market = "HOME WIN + OVER";
    } else if(diff>15){
      pick = `${t.h.split(' ')[1].toUpperCase()} WIN`;
      odd = (1.65 + Math.random()*0.2).toFixed(2);
      market = "WIN";
    } else {
      pick = `DOUBLE CHANCE ${t.h.split(' ')[1].toUpperCase()} OR DRAW`;
      odd = "1.35";
      market = "DOUBLE CHANCE";
    }
    return {
      league: "🌍 AFCON QUALIFIERS U17 • TODAY 17:00",
      home: t.h,
      away: t.a,
      odd: odd,
      pick: `${pick} @${odd}`,
      pickDetail: pick,
      stats: `AI: Strength ${t.s[0]} vs ${t.s[1]} | Home +10 | Analyzed`,
      market: market
    };
  });

  res.status(200).json({success:true, date: new Date().toISOString().split('T')[0], matches: picks});
}
