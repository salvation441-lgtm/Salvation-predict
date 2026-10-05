// api/live.js - Salvation Predict Live Scores
// This dey run on Vercel serverless - updates every minute

export default function handler(req, res) {
  // Allow your site to call this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Simulate live changing scores (based on time)
  const now = new Date();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Make scores look live based on current time
  const liveGames = [
    {
      home: "Arsenal",
      away: "Bournemouth",
      homeScore: 1 + (minute % 2),
      awayScore: minute % 2,
      status: minute % 3 === 0 ? "LIVE" : "HT",
      time: `${45 + (minute % 45)}'`,
      league: "PL"
    },
    {
      home: "Dreams FC",
      away: "Hearts of Oak",
      homeScore: 0 + (minute % 2),
      awayScore: 1,
      status: "LIVE",
      time: `${minute}'`,
      league: "GPL"
    },
    {
      home: "Samartex",
      away: "Kotoko",
      homeScore: second % 2,
      awayScore: second % 2,
      status: "LIVE",
      time: `${30 + (minute % 30)}'`,
      league: "GPL"
    }
  ];

  res.status(200).json({ liveGames, updated: now.toISOString() });
}
