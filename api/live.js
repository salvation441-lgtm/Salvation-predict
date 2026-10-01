export default async function handler(req,res){
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Cache-Control','s-maxage=30');
const KEY=process.env.API_FOOTBALL_KEY;
if(!KEY) return res.status(500).json({error:'No KEY'});
const today=new Date().toISOString().slice(0,10);
try{
const r=await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`,{headers:{'x-apisports-key':KEY}});
const j=await r.json();
if(!j.response) return res.json({today:[],count:0});
function hashOdds(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%100;return h;}
let games=j.response.slice(0,20).map(f=>{
 let h=f.teams.home.name, a=f.teams.away.name;
 let rnd=hashOdds(h+a);
 let homeOdd=(1.55 + (rnd%85)/100).toFixed(2);
 let awayOdd=(2.1 + ((rnd*2)%120)/100).toFixed(2);
 let drawOdd=(3.0 + ((rnd*3)%90)/100).toFixed(2);
 let pred=rnd>50?h:a;
 return{
  f:f.fixture.id, h, a, s:`${f.goals.home??0}-${f.goals.away??0}`,
  l:f.league.name, time:new Date(f.fixture.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
  status:f.fixture.status.short, live:['1H','2H','HT','LIVE'].includes(f.fixture.status.short),
  p:pred, o:pred===h?homeOdd:awayOdd, o2:pred===h?awayOdd:homeOdd, x:drawOdd
 }
});
let live=games.filter(g=>g.live);
res.json({today:games,live,count:games.length,date:today,plan:`FREE Active - ${j.results||games.length} used`});
}catch(e){res.status(500).json({error:e.message})}
}
