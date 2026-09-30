export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=30');
  try {
    const todayStr = new Date().toISOString().split('T')[0].replace(/-/g,'');
    // Fetch ALL soccer today - real matches
    const urls = [
      `https://site.api.espn.com/apis/site/v2/sports/soccer/all/scoreboard?dates=${todayStr}`,
      'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
      'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard',
      'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard'
    ];
    let allLive = [];
    let allToday = [];
    for(let url of urls){
      let r = await fetch(url).then(r=>r.json()).catch(()=>null);
      if(!r?.events) continue;
      r.events.forEach(ev=>{
        let comp = ev.competitions?.[0];
        if(!comp) return;
        let home = comp.competitors.find(c=>c.homeAway==='home');
        let away = comp.competitors.find(c=>c.homeAway==='away');
        if(!home ||!away) return;
        let isLive = comp.status.type.state === 'in';
        let obj = {
          h: home.team.displayName,
          a: away.team.displayName,
          l: (ev.leagues?.[0]?.name || ev.shortName || 'MATCH') + ' • ' + comp.status.type.detail,
          s: home.score+'-'+away.score,
          o: (1.5+Math.random()*1.2).toFixed(2),
          x: (3+Math.random()).toFixed(2),
          o2: (2.5+Math.random()*3).toFixed(2),
          p: home.team.displayName+' WIN',
          live: isLive,
          hot: isLive
        };
        if(isLive) allLive.push(obj);
        allToday.push(obj);
      });
    }
    // Deduplicate
    let uniq = {};
    allToday.forEach(m=>{ uniq[m.h+'-'+m.a] = m });
    allToday = Object.values(uniq);
    uniq = {};
    allLive.forEach(m=>{ uniq[m.h+'-'+m.a] = m });
    allLive = Object.values(uniq);

    // If no real live at this hour, keep sample but mark as TODAY not LIVE
    if(allLive.length===0){
      // still return today matches if we have them
      if(allToday.length>0){
        return res.status(200).json({live:[],today:allToday,tomorrow:[]});
      }
    }
    res.status(200).json({live:allLive,today:allToday,tomorrow:[],count:allLive.length});
  } catch(e){
    res.status(200).json({live:[],today:[],tomorrow:[]});
  }
}
