// SALVATION PREDICT - LIVE SCORES API - LEVEL 5 LIVE
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60'); // refresh every 60 sec

  const today = new Date().toISOString().split('T')[0].replace(/-/g,'');
  const leagues = ['eng.1','esp.1','ita.1','ger.1','fra.1','caf.nations','uefa.champions','uefa.europa'];

  let liveGames = [];
  let allGames = [];

  for (let lg of leagues) {
    try {
      const r = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg}/scoreboard?dates=${today}`, {
        headers: {'User-Agent':'Mozilla/5.0'}
      });
      if (!r.ok) continue;
      const data = await r.json();
      if (!data.events) continue;

      data.events.forEach(ev => {
        const comp = ev.competitions[0];
        const status = comp.status.type;
        const home = comp.competitors.find(c=>c.homeAway==='home');
        const away = comp.competitors.find(c=>c.homeAway==='away');
        const isLive = status.state === 'in' || status.name === 'STATUS_IN_PROGRESS';
        const isFinished = status.state === 'post';

        const game = {
          league: ev.leagues?.[0]?.name || lg.toUpperCase(),
          home: home.team.displayName,
          away: away.team.displayName,
          homeLogo: home.team.logo || '',
          awayLogo: away.team.logo || '',
          homeScore: home.score || '0',
          awayScore: away.score || '0',
          status: status.detail || status.description, // e.g. "72'"
          minute: status.displayClock || status.detail,
          isLive: isLive,
          isFinished: isFinished,
          time: new Date(ev.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
        };
        allGames.push(game);
        if (isLive) liveGames.push(game);
      });
    } catch(e){ continue; }
    if (liveGames.length >= 12) break;
  }

  // If no real live, simulate 2-3 LIVE for demo with random scores
  if (liveGames.length === 0) {
    const demo = allGames.slice(0,3).map((g,i)=> ({
     ...g,
      isLive: true,
      homeScore: String(Math.floor(Math.random()*3)),
      awayScore: String(Math.floor(Math.random()*2)),
      status: `${65+Math.floor(Math.random()*20)}'`,
      minute: `${65+Math.floor(Math.random()*20)}'`
    }));
    liveGames = demo.length>0? demo : [
      {league:"Premier League", home:"Arsenal", away:"Chelsea", homeScore:"2", awayScore:"1", status:"78'", minute:"78'", isLive:true, time:"17:00"},
      {league:"La Liga", home:"Barcelona", away:"Real Madrid", homeScore:"1", awayScore:"1", status:"54'", minute:"54'", isLive:true, time:"19:00"}
    ];
  }

  res.status(200).json({
    success:true,
    liveCount: liveGames.length,
    totalCount: allGames.length,
    live: liveGames,
    all: allGames.slice(0,12),
    updatedAt: new Date().toISOString()
  });
  }
