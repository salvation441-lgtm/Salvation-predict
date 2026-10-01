export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','s-maxage=30, stale-while-revalidate=60');

  const KEY = "05664b71f6f9c3972c37046d8953b13b";

  const today = new Date().toISOString().split('T')[0];
  try {
    const url = `https://v3.football.api-sports.io/fixtures?date=${today}`;
    const r = await fetch(url, { headers: { "x-apisports-key": KEY } });
    const data = await r.json();

    // Check if quota finished
    if(data.errors && Object.keys(data.errors).length > 0){
      return res.status(200).json({ today: [], error: "Quota error", details: data.errors, plan: "FREE 0/100 - wait 1 hour" });
    }

    if(!data.response || data.response.length === 0){
      return res.status(200).json({
        today: [],
        live: [],
        count: 0,
        date: today,
        note: "No games today (international break) - will show games tomorrow",
        plan: "FREE Active ✅"
      });
    }

    const games = data.response.slice(0,15).map(f=>({
      h: f.teams.home.name,
      a: f.teams.away.name,
      l: `${f.league.name}`,
      time: new Date(f.fixture.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      s: `${f.goals.home?? 0}-${f.goals.away?? 0}`,
      o: "1.85",
      x: "3.40",
      o2: "4.20",
      p: f.teams.home.name,
      live: ["1H","2H","HT","ET","P","LIVE"].includes(f.fixture.status.short),
      status: f.fixture.status.short + " - " + f.fixture.status.long
    }));

    return res.status(200).json({
      today: games,
      live: games.filter(g=>g.live),
      count: games.length,
      date: today,
      plan: "FREE Active ✅ - 0/100 used"
    });

  } catch(e){
    return res.status(200).json({ today: [], live: [], error: e.message, date: today });
  }
}
