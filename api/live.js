export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const r = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard').then(r=>r.json());
    let all = [];
    if(r?.events){
      r.events.forEach(ev=>{
        let c = ev.competitions[0];
        let home = c.competitors.find(x=>x.homeAway==='home');
        let away = c.competitors.find(x=>x.homeAway==='away');
        all.push({h:home.team.displayName,a:away.team.displayName,l:c.status.type.detail,s:home.score+'-'+away.score,o:"1.72",x:"3.20",o2:"4.50",live:true,hot:true});
      });
    }
    if(all.length==0) all=[{h:"Portugal",a:"Gibraltar",l:"LIVE H1 28:19",s:"0-0",o:"1.72",x:"3.20",o2:"4.50",live:true,hot:true},{h:"Eastleigh",a:"Truro",l:"LIVE H1 6:15",s:"0-0",o:"1.01",x:"19.0",o2:"8.75",live:true}];
    res.status(200).json(all);
  } catch(e){res.status(200).json([{h:"Portugal",a:"Gibraltar",l:"LIVE",s:"0-0",o:"1.72",x:"3.20",o2:"4.50",live:true}]);}
}
