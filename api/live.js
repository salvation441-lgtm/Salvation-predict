// api/live.js - Salvation Predict Live Scores
// This dey run on Vercel serverless

export default function handler(req, res) {
  // Allow your site to call this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Simulate live changing scores (later we go connect real football API)
  const now = new Date();
  const minute = now.getMinutes();

  // Make scores look live based on time
  const liveGames = [
    {
      home: "Arsenal",
      away: "Bournemouth",
      league: "PL",
      leagueFull: "PL - 88%",
      type: "1",
      pred: "HOME WIN",
      conf: 88,
      info: minute % 2 === 0 ? "FT 2-0 WON ✅" : "FT 2-0 WON ✅"
    },
    {
      home: "Barcelona",
      away: "Espanyol",
      league: "LaLiga",
      leagueFull: "LaLiga - 94%",
      type: "1",
      pred: "HOME WIN",
      conf: 94,
      info: `Barca 1-0 ${65 + (minute % 15)}' 🔴`
    },
    {
      home: "Hearts of Oak",
      away: "Kotoko",
      league: "GPL",
      leagueFull: "Ghana Premier - 85%",
      type: "1",
      pred: "HOME WIN",
      conf: 85,
      info: minute % 3 === 0 ? "LIVE 1-0 23' 🔴" : "LIVE 1-0 24' 🔴"
    },
    {
      home: "Chelsea",
      away: "Liverpool",
      league: "PL",
      leagueFull: "Premier League - 90%",
      type: "OVER",
      pred: "OVER 2.5",
      conf: 90,
      info: `LIVE 1-1 ${50 + (minute % 10)}'`
    },
    {
      home: "Bayern Munich",
      away: "Dortmund",
      league: "Bundes",
      leagueFull: "Bundesliga - 82%",
      type: "2",
      pred: "AWAY WIN",
      conf: 82,
      info: "19:45"
    },
    {
      home: "Inter Milan",
      away: "AC Milan",
      league: "SerieA",
      leagueFull: "Serie A - 78%",
      type: "X",
      pred: "DRAW",
      conf: 78,
      info: "20:00"
    }
  ];

  res.status(200).json(liveGames);
}
