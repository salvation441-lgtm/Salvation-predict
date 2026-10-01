export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 const KEY=process.env.API_FOOTBALL_KEY;
 const today=new Date().toISOString().slice(0,10);
 const tomorrow=new Date(Date.now()+86400000).toISOString().slice(0,10);
 async function get(url){
  const r=await fetch(url,{headers:{'x-apisports-key':KEY}});
  const j=await r.json(); return j.response||[];
 }
 try{
  let fixtures=await get(`https://v3.football.api-sports.io/fixtures?date=${today}`);
  if(fixtures.length===0){
   fixtures=await get(`https://v3.football.api-sports.io/fixtures?live=all`);
  }
  if(fixtures.length===0){
   fixtures=await get(`https://v3.football.api-sports.io/fixtures?date=${tomorrow}`);
  }
  let list=fixtures.slice(0,25).map(f=>{
   return {
    f:f.fixture.id,
    h:f.teams.home.name,
    a:f.teams.away.name,
    s:`${f.goals.home??0}-${f.goals.away??0}`,
    l:f.league.name,
    time:new Date(f.fixture.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
    status:f.fixture.status.short,
    live:['1H','2H','HT','LIVE'].includes(f.fixture.status.short),
    p:Math.random()>0.5?f.teams.home.name:f.teams.away.name,
    o:(1.60+Math.random()*1.6).toFixed(2)
   }
  });
  res.json({today:list,count:list.length,date:today,live:list.filter(x=>x.live),plan:`LIVE: ${list.filter(x=>x.live).length} | REAL`});
 }catch(e){
  res.json({today:[],count:0,date:today,live:[],plan:'Error',error:e.message});
 }
}
