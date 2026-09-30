export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    // Get live + today from ESPN (free, no key)
    const urls = [
      'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
      'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard',
      'https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard',
      'https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard'
    ];
    let all = [];
    for(let u of urls){
      let r = await fetch(u).then(r=>r.json()).catch(()=>null);
      if(r?.events){
        r.events.forEach(ev=>{
          let comp = ev.competitions[0];
          let home = comp.competitors.find(c=>c.homeAway==='home');
          let away = comp.competitors.find(c=>c.homeAway==='away');
          let status = comp.status.type.detail;
          let isLive = comp.status.type.state === 'in';
          all.push({
            h: home.team.displayName,
            a: away.team.displayName,
            l: ev.leagues?.[0]?.name || 'EUROPE',
            s: home.score+'-'+away.score,
            time: status,
            o: (1.5 + Math.random()).toFixed(2),
            x: (3.0 + Math.random()*2).toFixed(2),
            o2: (3.5 + Math.random()*3).toFixed(2),
            live: isLive,
            hot: Math.random()>0.6
          });
        });
      }
    }
    // If ESPN empty at night, return sample live
    if(all.length===0){
      all = [
        {h:"Portugal",a:"Gibraltar",l:"EUROPE Friendlies • 28:19 H1",s:"0-0",time:"28:19 H1",o:"1.72",x:"3.20",o2:"4.50",live:true,hot:true},
        {h:"Eastleigh",a:"Truro",l:"ENGLAND National • 6:15 H1",s:"0-0",time:"6:15 H1",o:"1.01",x:"19.0",o2:"8.75",live:true,hot:false}
      ];
    }
    res.status(200).json(all);
  } catch(e){
    res.status(200).json([]);
  }
}
